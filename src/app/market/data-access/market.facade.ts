import {inject, Injectable} from '@angular/core';
import {MarketInfra} from '../infrastructure/market.infra';
import {firstValueFrom, interval, Subject} from 'rxjs';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ContentItem, ContentItemDto} from '../entity/market.entity';
import {Filter, Operator} from '@shared/entity/common.entity';

@Injectable({providedIn: 'root'})
export class MarketFacade {
  private readonly isMarketLoading$ = new Subject<boolean>();
  private readonly marketContentsSubject = new Subject<ContentItem[]>();
  private readonly marketInfra = inject(MarketInfra);
  private readonly nzMessageService = inject(NzMessageService);
  marketContent$ = this.marketContentsSubject.asObservable();

  async loadMarketContentData(filters: Filter<ContentItemDto, Operator, string>[], pageSize: number = 50, pageNumber: number = 0) {
    try {
      this.isMarketLoading$.next(true);
      const response = await firstValueFrom(this.marketInfra.getMarketWithPagination(filters, pageSize, pageNumber));
      this.marketContentsSubject.next(response.content);
    } catch (e) {
      console.error(e);
      this.nzMessageService.error('Error while fetching market');
    } finally {
      this.isMarketLoading$.next(false);
    }
  }

  updateMarketsByInterval(filters: Filter<ContentItemDto, Operator, string>[], _interval: number) {
    return interval(_interval).subscribe(() => {
      this.loadMarketContentData(filters).then();
    });
  }
}
