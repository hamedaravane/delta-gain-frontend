import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  convertCryptocurrencyResponseDtoToDomain,
  CryptocurrencyResponseDto
} from '../entity/coinmarketcap.entity';
import { map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CoinmarketcapInfra {
  private readonly baseUrl = 'https://pro-api.coinmarketcap.com';
  private readonly httpClient = inject(HttpClient);

  getIdMap() {
    return this.httpClient.get<CryptocurrencyResponseDto>(this.baseUrl + '/v1/cryptocurrency/map')
      .pipe(
        map((res) => {
          return convertCryptocurrencyResponseDtoToDomain(res).data;
        })
      );
  }
}