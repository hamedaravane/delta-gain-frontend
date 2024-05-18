import {inject, Injectable} from '@angular/core';
import {MarketInfra} from '../infrastructure/market.infra';
import {firstValueFrom, Subject} from 'rxjs';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ContentItem} from "../entity/market.entity";

@Injectable({providedIn: 'root'})
export class MarketFacade {
  private readonly marketInfra = inject(MarketInfra);
  private readonly isMarketLoading$ = new Subject<boolean>();
  private readonly nzMessageService = inject(NzMessageService);
  private readonly marketContentsSubject = new Subject<ContentItem[]>();
  marketContent$ = this.marketContentsSubject.asObservable();

  async getMarket() {
    try {
      this.isMarketLoading$.next(true);
      const response = await firstValueFrom(this.marketInfra.getMarketWithPagination());
      this.marketContentsSubject.next(response.content);
    } catch (e) {
      this.nzMessageService.error('Error while fetching market');
    } finally {
      this.isMarketLoading$.next(false);
    }
  }
}
