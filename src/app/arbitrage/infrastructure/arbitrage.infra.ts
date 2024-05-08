import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ArbitrageResponse,
  ArbitrageResponseDto,
  convertArbitrageResponse
} from '../entity/arbitrage.entity';
import { map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ArbitrageInfra {
  private readonly baseUrl = 'http://152.228.152.64:1899';
  private readonly httpClient = inject(HttpClient);

  getArbitrages(page: number = 0, size: number = 20) {
    return this.httpClient.get<ArbitrageResponseDto>(`${this.baseUrl}/arbitrages?page=${page}&size=${size}`).pipe(map<ArbitrageResponseDto, ArbitrageResponse>(response => convertArbitrageResponse(response)));
  }
}