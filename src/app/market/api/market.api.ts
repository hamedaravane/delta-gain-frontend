import {inject, Injectable} from '@angular/core';
import {MarketFacade} from "../data-access/market.facade";
import {Filter, Operator} from '@shared/entity/common.entity';
import {MarketDto} from '../entity/market.entity';

@Injectable({providedIn: 'root'})
export class MarketApi {
  private readonly marketFacade = inject(MarketFacade);

  get marketsContentData$() {
    return this.marketFacade.marketContent$;
  }

  loadMarketContent(filters: Filter<MarketDto, Operator, string>[]) {
    this.marketFacade.loadMarketContentData(filters).then();
  }
}
