import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs';
import {environment} from "@environment";
import {
  ArbitrageDto,
  ArbitrageResponse,
  ArbitrageResponseDto,
  convertArbitrageResponseDtoToArbitrageResponse
} from '../entity/arbitrage.entity';
import {Filter, Operator} from '@shared/entity/common.entity';

@Injectable({providedIn: 'root'})
export class ArbitrageInfra {
  private readonly httpClient = inject(HttpClient);

  getArbitrage(pageIndex: number = 0, pageSize: number = 20, filters?: Filter<ArbitrageDto, Operator, string>[]) {
    let params = new HttpParams().append('page', pageIndex).append('size', pageSize);
    filters?.forEach(filter => {
      params = params.append(`${filter.key}${filter.operator}`, filter.value)
        .append('page', pageIndex)
        .append('size', pageSize);
    });
    return this.httpClient.get<ArbitrageResponseDto>
    (`${environment.baseUrl}/v1/arbitrages`, {params})
      .pipe(
        map<ArbitrageResponseDto, ArbitrageResponse>(response => convertArbitrageResponseDtoToArbitrageResponse(response))
      );
  }
}
