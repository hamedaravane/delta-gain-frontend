import { inject, Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import {convertSpotActionDtoToDomain, SpotActionDTO, SpotAction} from '@orders/entity/order.entity';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class OrdersInfra {
  protected readonly httpClient = inject(HttpClient);

  public getOrders(): Observable<SpotAction[]> {
    return this.httpClient.get<SpotActionDTO[]>('http://localhost:3000/api/orders').pipe(
      map((response) => {
        return convertSpotActionDtoToDomain(response);
      })
    )
  }
}
