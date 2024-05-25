import { inject, Injectable } from '@angular/core';
import { MarketInfra } from '../infrastructure/market.infra';
import { combineLatest, firstValueFrom, interval, map, Subject } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Market, MarketDto } from '../entity/market.entity';
import { Filter, Operator } from '@shared/entity/common.entity';
import { ArbitrageApi } from '../../arbitrage/api/arbitrage.api';

@Injectable({providedIn: 'root'})
export class MarketFacade {
  private readonly isMarketLoading$ = new Subject<boolean>();
  private readonly marketContentsSubject = new Subject<Market[]>();
  private readonly marketInfra = inject(MarketInfra);
  private readonly nzMessageService = inject(NzMessageService);
  private readonly arbitrageApi = inject(ArbitrageApi);
  marketContent$ = this.marketContentsSubject.asObservable();

  async loadMarketContentData(page = 0, size = 200, filters: Filter<MarketDto, Operator, string>[]) {
    try {
      this.isMarketLoading$.next(true);
      const response = await firstValueFrom(this.marketInfra.getMarketWithPagination(page, size, filters));
      this.marketContentsSubject.next(response.content);
    } catch (e) {
      console.error(e);
      this.nzMessageService.error('Error while fetching market');
    } finally {
      this.isMarketLoading$.next(false);
    }
  }

  getMarketChartData$(currency: string, startTime: Date | null) {
    if (startTime) {
      this.loadMarketContentData(0, 1000, [
        {key: 'currencyBase', operator: '_eq', value: currency},
        {key: 'createdAt', operator: '_lg', value: startTime.toISOString()}]).then();
    }
    return combineLatest([
      this.arbitrageApi.getArbitrages(0, 3, [{
        key: 'currencyBase',
        operator: '_eq',
        value: currency
      }]), this.marketContent$
    ]).pipe(
      map(([arbitrages, markets]) => {
        return [...arbitrages, ...markets].sort((a, b) => {
          return b.createdAt!.getTime() - a.createdAt!.getTime();
        });
      })
    );
  }

  updateMarketsByInterval(filters: Filter<MarketDto, Operator, string>[], _interval: number) {
    return interval(_interval).subscribe(() => {
      this.loadMarketContentData(undefined, undefined, filters).then();
    });
  }
}
