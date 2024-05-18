import { inject, Injectable } from '@angular/core';
import { MarketInfra } from '../infrastructure/market.infra';
import { firstValueFrom, Subject } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({providedIn: 'root'})
export class MarketFacade {
  private readonly marketInfra = inject(MarketInfra);
  private readonly isMarketLoading$ = new Subject<boolean>();
  private readonly nzMessageService = inject(NzMessageService);

  async getMarket() {
    try {
      this.isMarketLoading$.next(true);
      const response = await firstValueFrom(this.marketInfra.getMarketWithPagination());
      return response.content;
    } catch (e) {
      this.nzMessageService.error('Error while fetching market');
    } finally {
      this.isMarketLoading$.next(false);
    }
  }
}