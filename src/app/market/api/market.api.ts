import {inject, Injectable} from '@angular/core';
import {MarketFacade} from "../data-access/market.facade";

@Injectable({providedIn: 'root'})
export class MarketApi {
  private readonly marketFacade = inject(MarketFacade);

  get marketsContentData$() {
    return this.marketFacade.marketContent$;
  }

  loadMarketContent() {
    this.marketFacade.loadMarketContentData().then();
  }
}
