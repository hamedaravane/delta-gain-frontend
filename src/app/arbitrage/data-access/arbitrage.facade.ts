import { inject, Injectable } from '@angular/core';
import { ArbitrageInfra } from '../infrastructure/arbitrage.infra';
import { firstValueFrom, interval, map, Subject, Subscription } from 'rxjs';
import { Arbitrage, ArbitrageResponse } from '../entity/arbitrage.entity';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MarketApi } from '../../market/api/market.api';

@Injectable({providedIn: 'root'})
export class ArbitrageFacade {
  private readonly arbitrageInfra = inject(ArbitrageInfra);
  private readonly arbitragesSubject = new Subject<ArbitrageResponse>();
  private readonly isArbitragesLoadingSubject = new Subject<boolean>();
  private readonly marketApi = inject(MarketApi);
  private readonly nzMessageService = inject(NzMessageService);
  arbitrages$ = this.arbitragesSubject.asObservable().pipe(map(value => this.addCurrencyLogos(value.embedded.arbitrages)));
  arbitragesPages$ = this.arbitragesSubject.asObservable().pipe(map(value => value.page));
  isArbitragesLoading$ = this.isArbitragesLoadingSubject.asObservable();
  reloadDataSubscription = new Subscription();

  addCurrencyLogos(arbitrages: Arbitrage[]) {
    const logos = this.marketApi.cryptocurrencyLogos;
    return arbitrages.map(arbitrage => {
      return {
        ...arbitrage,
        currencyBaseLogo: logos.find(currency => currency.symbol === arbitrage.currencyBase)?.logo
      } as Arbitrage;
    });
  }

  async loadArbitrages(page: number = 0, size: number = 20) {
    this.isArbitragesLoadingSubject.next(true);
    try {
      const response = await firstValueFrom(this.arbitrageInfra.getArbitrages(page, size));
      this.arbitragesSubject.next(response);
    } catch (e) {
      this.nzMessageService.error('Error while fetching arbitrages');
    } finally {
      this.isArbitragesLoadingSubject.next(false);
    }
  }

  reloadArbitrages(page: number, size: number, _interval: number) {
    this.reloadDataSubscription = interval(_interval).subscribe(() => {
      firstValueFrom(this.arbitrageInfra.getArbitrages(page, size)).then(response => {
        this.arbitragesSubject.next(response);
      }).catch(() => {
        this.nzMessageService.error('Error while fetching arbitrages');
      });
    });
  }
}
