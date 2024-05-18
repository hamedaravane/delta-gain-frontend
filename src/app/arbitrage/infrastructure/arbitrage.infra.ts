import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ArbitrageResponse, ArbitrageResponseDto, convertArbitrageResponse} from '../entity/arbitrage.entity';
import {map} from 'rxjs';
import {environment} from "@environment";

@Injectable({providedIn: 'root'})
export class ArbitrageInfra {
  private readonly httpClient = inject(HttpClient);

  getArbitrages(page: number = 0, size: number = 20) {
    return this.httpClient.get<ArbitrageResponseDto>(`${environment.baseUrl}/arbitrages?page=${page}&size=${size}&sort=createdAt,desc`).pipe(map<ArbitrageResponseDto, ArbitrageResponse>(response => convertArbitrageResponse(response)));
  }
}
