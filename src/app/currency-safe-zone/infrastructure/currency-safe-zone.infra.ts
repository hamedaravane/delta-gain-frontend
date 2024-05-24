import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environment';
import {
  convertCurrencySfzResponseDtoToDomain,
  CurrencySfzResponse,
  CurrencySfzResponseDto
} from '../entity/currency-safe-zone.entity';
import {map} from 'rxjs';

@Injectable({providedIn: 'root'})
export class CurrencySafeZoneInfra {
  private readonly httpClient = inject(HttpClient);

  getCurrencySafeZones() {
    return this.httpClient.get<CurrencySfzResponseDto>(`${environment.baseUrl}/currencySfzes?page=0&size=300`)
      .pipe(
        map<CurrencySfzResponseDto, CurrencySfzResponse>(
          (response) => convertCurrencySfzResponseDtoToDomain(response)
        )
      );
  }
}
