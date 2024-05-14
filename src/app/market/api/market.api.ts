import { inject, Injectable } from '@angular/core';
import { CoinMarketCapFacade } from '../data-access/coinmarketcap.facade';

@Injectable({providedIn: 'root'})
export class MarketApi {
  private readonly coinmarketcapFacade = inject(CoinMarketCapFacade);

  get cryptocurrencyLogos() {
    return this.coinmarketcapFacade.cryptocurrencyLogos;
  }
}