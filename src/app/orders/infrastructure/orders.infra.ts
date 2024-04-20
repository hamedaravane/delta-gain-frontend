import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {InfraAbstract} from '@shared/abstract/infra.abstract';
import {convertSpotActionDtoToDomain, SpotActionDTO, SpotAction} from '@orders/entity/order.entity';

@Injectable({providedIn: 'root'})
export class OrdersInfra extends InfraAbstract {

  public getOrders(): Observable<SpotAction> {
    return this.httpClient.get<SpotActionDTO>('').pipe(
      map((response) => {
        return convertSpotActionDtoToDomain(response);
      })
    )
  }
}
