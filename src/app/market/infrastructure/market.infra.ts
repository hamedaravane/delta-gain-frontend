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

  getMarketWithPagination(page = 0, size = 200, filters: Filter<MarketDto, Operator, string>[] = []) {
    let params = new HttpParams()
      .append('page', page)
      .append('size', size);
    filters.forEach(filter => {
      params = params.append(`${filter.key}${filter.operator}`, filter.value);
    });
    return this.httpClient.get<PaginationResponseDto>(`${environment.baseUrl}/v1/market`, {params}).pipe(
      map<PaginationResponseDto, PaginationResponse>((res) => convertPaginationResponseDtoToDomain(res))
    );
  }
}
