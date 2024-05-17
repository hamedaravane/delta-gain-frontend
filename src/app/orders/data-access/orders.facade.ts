import {inject, Injectable} from '@angular/core';
import {OrdersInfra} from '@orders/infrastructure/orders.infra';
import {NzMessageService} from 'ng-zorro-antd/message';
import {firstValueFrom, interval, map, Subject, Subscription} from 'rxjs';
import {Order, OrderResponse} from '@orders/entity/order.entity';
import {MarketApi} from '../../market/api/market.api';

@Injectable({providedIn: 'root'})
export class OrdersFacade {
  private readonly isOrdersLoadingSubject = new Subject<boolean>();
  private readonly marketApi = inject(MarketApi);
  private readonly nzMessageService = inject(NzMessageService);
  private readonly ordersInfra = inject(OrdersInfra);
  private readonly ordersSubject = new Subject<OrderResponse>();
  isOrdersLoading$ = this.isOrdersLoadingSubject.asObservable();
  orders$ = this.ordersSubject.asObservable().pipe(map(value => this.addCurrencyLogos(value.embedded.orders)));
  ordersPages$ = this.ordersSubject.asObservable().pipe(map(value => value.page));
  reloadDataSubscription = new Subscription();

  addCurrencyLogos(orders: Order[]) {
    const logos = this.marketApi.cryptocurrencyLogos;
    return orders.map(order => {
      return {
        ...order,
        currencyLogo: logos.find(currency => currency.symbol === order.currency)?.logo
      } as Order;
    });
  }

  async loadOrders(page: number, size: number) {
    this.isOrdersLoadingSubject.next(true);
    try {
      const response = await firstValueFrom(this.ordersInfra.getOrders(page, size));
      this.ordersSubject.next(response);
    } catch {
      this.nzMessageService.error('Error loading orders');
    } finally {
      this.isOrdersLoadingSubject.next(false);
    }
  }

  reloadOrders(page: number, size: number, _interval: number) {
    this.reloadDataSubscription = interval(_interval).subscribe(() => {
      this.loadOrders(page, size).then();
    });
  }
}
