import {inject, Injectable} from '@angular/core';
import {OmpfinexInfra} from 'src/app/market/infrastructure/ompfinex.infra';
import {firstValueFrom, Subject} from 'rxjs';
import {convertOmpfinexOrderDtoToDomain, OmpfinexMarkets, Order, OrderDto} from 'src/app/market/entity/ompfinex.entity';
import {NzMessageService} from "ng-zorro-antd/message";
import {getErrorMessage} from "@shared/entity/error.entity";

@Injectable({providedIn: 'root'})
export class OmpfinexFacade {
  private readonly infra = inject(OmpfinexInfra);
  private readonly nzMessageService = inject(NzMessageService);
  ompfinexMarketsSubject = new Subject<OmpfinexMarkets[]>();
  private readonly initialOrders = new Subject<Order[]>();

  constructor() {
    this.getUsdtMarkets();
  }

  getUsdtMarkets() {
    firstValueFrom(this.infra.getUsdtMarkets()).then((response) => {
      this.ompfinexMarketsSubject.next(response);
    }).catch((e) => console.error(e));
  }

  async getAllOrders(marketId?: string, status?: string) {
    const allOrders = new Array<OrderDto>();
    try {
      const lastOrders = await firstValueFrom(this.infra.getRawOrders(1, marketId, status));
      allOrders.push(...lastOrders.data);
      const totalPages = lastOrders.total_pages;
      let pageIndex = lastOrders.page;
      while (totalPages > pageIndex) {
        const nextOrders = await firstValueFrom(this.infra.getRawOrders(pageIndex + 1, marketId, status));
        allOrders.unshift(...nextOrders.data);
        pageIndex++;
      }
    } catch (err) {
      this.nzMessageService.error(`Could not fetch orders | ${getErrorMessage(err)}`);
    }
    const result = allOrders.map((order) => {
      return convertOmpfinexOrderDtoToDomain(order)
    }).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    this.initialOrders.next(result);
    return result;
  }

  async getLatestOrders() {
    const latestOrders = await firstValueFrom(this.infra.getRawOrders(1));
  }
}
