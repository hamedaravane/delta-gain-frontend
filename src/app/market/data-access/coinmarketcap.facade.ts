import { inject, Injectable } from '@angular/core';
import { CoinmarketcapInfra } from '../infrastructure/coinmarketcap.infra';
import { firstValueFrom, map, Subject } from 'rxjs';
import { CurrencyLogo } from '../entity/coinmarketcap.entity';
import { NzMessageService } from 'ng-zorro-antd/message';
import { coinmarketcapMapId } from '../constant/coinmarketcap.constant';

@Injectable({providedIn: 'root'})
export class CoinMarketCapFacade {
  private readonly coinmarketcapInfra = inject(CoinmarketcapInfra);
  private readonly nzMessageService = inject(NzMessageService);
  private readonly coinmarketcapCurrencyLogos = new Array<CurrencyLogo>();
  get cryptocurrencyLogos() {
    return this.getCurrencyLogosLocally();
  }

  getCurrencyLogosLocally(): CurrencyLogo[] {
    return coinmarketcapMapId.map((currency) => {
      return {
        id: currency.id,
        name: currency.name,
        symbol: currency.symbol,
        logo: `https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`
      };
    });
  }

  async getCurrencyLogos() {
    if (this.coinmarketcapCurrencyLogos.length > 0) {
      return this.coinmarketcapCurrencyLogos;
    } else {
      try {
        const response = await firstValueFrom(this.coinmarketcapInfra.getIdMap().pipe(map(currencies => {
          return currencies.map((currency): CurrencyLogo => {
            return {
              id: currency.id,
              name: currency.name,
              symbol: currency.symbol,
              logo: `https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`
            }
          });
        })));
        this.coinmarketcapCurrencyLogos.push(...response);
        return response;
      } catch {
        throw new Error('Could not fetch currency logos');
      }
    }
  }
}
