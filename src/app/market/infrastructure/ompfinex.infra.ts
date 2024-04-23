import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { convertOmpfinexMarketsDtoToDomain, OmpfinexApiResponse, OmpfinexMarketsDto } from 'src/app/market/entity/ompfinex.entity';
import { filter, map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class OmpfinexInfra {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = 'https://api.ompfinex.com/'

  getUsdtMarkets() {
    return this.httpClient.get<OmpfinexApiResponse<OmpfinexMarketsDto[]>>(this.baseUrl + 'v1/market').pipe(
      map((data) => {
        return data.data.map((market) => {
          return convertOmpfinexMarketsDtoToDomain(market);
        }).filter((predicate) => predicate.quoteCurrency.id === 'USDT')
      })
    )
  }
}
