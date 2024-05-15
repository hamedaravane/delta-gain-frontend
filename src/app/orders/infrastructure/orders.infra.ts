import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { convertOrderResponseDtoToDomain, OrderResponseDto } from '@orders/entity/order.entity';
import { map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class OrdersInfra {
  protected readonly httpClient = inject(HttpClient);
  private readonly baseUrl = 'https://api.ompfinex.com';

  getOrders(page: number, size: number) {
    return this.httpClient.get<OrderResponseDto>(`${this.baseUrl}/orders?page=${page}&size=${size}&sort=createdAt,desc`)
      .pipe(map((response) => convertOrderResponseDtoToDomain(response)));
  }
}
