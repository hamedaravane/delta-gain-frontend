import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs';
import {environment} from "@environment";
import {
  ArbitrageResponse,
  ArbitrageResponseDto,
  convertArbitrageResponseDtoToArbitrageResponse
} from "../entity/arbitrage.entity";

@Injectable({providedIn: 'root'})
export class ArbitrageInfra {
  private readonly httpClient = inject(HttpClient);

  getArbitrage(page: number = 0, size: number = 20) {
    const params = new HttpParams().append('page', page).append('size', size)
    return this.httpClient.get<ArbitrageResponseDto>
    (`${environment.baseUrl}/v1/arbitrages`, {params})
      .pipe(
        map<ArbitrageResponseDto, ArbitrageResponse>(response => convertArbitrageResponseDtoToArbitrageResponse(response))
      );
  }
}
