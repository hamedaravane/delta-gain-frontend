import { inject, Injectable } from '@angular/core';
import { OrdersInfra } from '@orders/infrastructure/orders.infra';
import { firstValueFrom, map, Subject } from 'rxjs';
import {
  convertOmpfinexOrderDtoToDomain,
  Order,
  OrderDto,
  SpotAction
} from '@orders/entity/order.entity';
import { getErrorMessage } from '@shared/entity/error.entity';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Big } from 'big.js';

@Injectable({providedIn: 'root'})
export class OrdersFacade {
  private readonly ordersInfra = inject(OrdersInfra);
  private readonly nzMessageService = inject(NzMessageService);
  private readonly spotOrdersSubject = new Subject<SpotAction[]>();
  readonly spotOrders$ = this.spotOrdersSubject.asObservable();
  private orders: Order[] | null = null;
  private lastOrderId = 0;
  private readonly ordersSubject = new Subject<Order[]>();
  orders$ = this.ordersSubject.asObservable();
  tradesMap = new Map<string, Order>;
  cumulativeOrders$ = this.orders$.pipe(map((orders) => {
    const completeTrades = [];
    for (const order of orders.reverse()) {
      const uniqueId = crypto.randomUUID();
      if (this.tradesMap.has(order.market.symbol)) {
        const remainVolume = Big(this.tradesMap.get(order.market.symbol)!.completedAmount);
        if (order.type === 'buy') {
          this.tradesMap.set(order.market.symbol, {...this.tradesMap.get(order.market.symbol)!, completedAmount: remainVolume.plus(order.completedAmount).toString()});
        }
        if (order.type === 'sell') {
          this.tradesMap.set(order.market.symbol, {...this.tradesMap.get(order.market.symbol)!, completedAmount: remainVolume.minus(order.completedAmount).toString()});
          const afterSellRemain = Big(this.tradesMap.get(order.market.symbol)!.completedAmount);
        }
      }
    }
  }));

  async getOrders() {
    const response =  await firstValueFrom(this.ordersInfra.getOrders());
    this.spotOrdersSubject.next(response);
  }

  async getAllOrders(marketId?: string, status?: string) {
    const allOrders = new Array<OrderDto>();
    try {
      const lastOrders = await firstValueFrom(this.ordersInfra.getRawOrders(1, marketId, status));
      allOrders.push(...lastOrders.data);
      const totalPages = lastOrders.total_pages;
      let pageIndex = lastOrders.page;
      while (totalPages > pageIndex) {
        const nextOrders = await firstValueFrom(this.ordersInfra.getRawOrders(pageIndex + 1, marketId, status));
        allOrders.unshift(...nextOrders.data);
        pageIndex++;
      }
    } catch (err) {
      this.nzMessageService.error(`Could not fetch orders | ${getErrorMessage(err)}`);
    }
    const result = allOrders.map((order) => {
      return convertOmpfinexOrderDtoToDomain(order);
    }).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    this.orders = result;
    this.lastOrderId = result[0].id;
    this.ordersSubject.next(result);
    return result;
  }

  async getLatestOrders() {
    if (this.orders) {
      const latestOrders = await firstValueFrom(this.ordersInfra.getLatestOrders(this.lastOrderId));
      if (latestOrders.length > 0) {
        this.lastOrderId = latestOrders[0].id;
        return latestOrders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      } else throw new Error('No new orders');
    } else {
      throw new Error('Orders not loaded');
    }
  }

  autoRefreshOrders() {
    setInterval(() => {
      this.getLatestOrders().then((orders) => {
        if (orders) {
          this.ordersSubject.next(this.orders!.concat(orders));
        }
      }).catch(e => this.nzMessageService.error(e));
    }, 10000);
  }
}
