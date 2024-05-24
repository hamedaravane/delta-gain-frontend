import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {
  convertPaginationResponseDtoToDomain,
  MarketDto,
  PaginationResponse,
  PaginationResponseDto
} from '../entity/market.entity';
import {map} from 'rxjs';
import {environment} from '@environment';
import {Filter, Operator} from '@shared/entity/common.entity';

@Injectable({providedIn: 'root'})
export class MarketInfra {
  private readonly httpClient = inject(HttpClient);

  getMarketWithPagination(filters: Filter<MarketDto, Operator, string>[], pageSize: number = 50, pageNumber: number = 0) {
    let params!: HttpParams;
    filters.forEach(filter => {
      params = new HttpParams().append(`${filter.key}${filter.operator}`, filter.value).append('size', pageSize);
    });
    return this.httpClient.get<PaginationResponseDto>(`${environment.baseUrl}/v1/market`, {params}).pipe(
      map<PaginationResponseDto, PaginationResponse>((res) => convertPaginationResponseDtoToDomain(res))
    );
  }
}
