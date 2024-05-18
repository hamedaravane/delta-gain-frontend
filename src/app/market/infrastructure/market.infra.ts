import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  convertPaginationResponseDtoToDomain,
  PaginationResponse,
  PaginationResponseDto
} from '../entity/market.entity';
import { map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class MarketInfra {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = '/api';

  getMarketWithPagination() {
    return this.httpClient.get<PaginationResponseDto>(`${this.baseUrl}/v1/market`).pipe(
      map<PaginationResponseDto, PaginationResponse>((res) => convertPaginationResponseDtoToDomain(res)),
    );
  }
}
