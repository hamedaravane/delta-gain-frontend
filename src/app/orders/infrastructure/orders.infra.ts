import { inject, Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import {convertSpotActionDtoToDomain, SpotActionDTO, SpotAction} from '@orders/entity/order.entity';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class OrdersInfra {
  protected readonly httpClient = inject(HttpClient);

  public getOrders(): Observable<SpotAction[]> {
    return this.httpClient.get<SpotActionDTO[]>('https://6624acac04457d4aaf9cb4e7.mockapi.io/api/v1/orders').pipe(
      map((response) => {
        return convertSpotActionDtoToDomain(response);
      })
    )
  }
}
