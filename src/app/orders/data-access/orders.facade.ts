import { inject, Injectable } from '@angular/core';
import { OrdersInfra } from '@orders/infrastructure/orders.infra';
import { firstValueFrom, Subject } from 'rxjs';
import { SpotAction } from '@orders/entity/order.entity';

@Injectable({providedIn: 'root'})
export class OrdersFacade {
  private readonly ordersInfra = inject(OrdersInfra);
  private readonly ordersSubject = new Subject<SpotAction[]>();
  readonly orders$ = this.ordersSubject.asObservable();

  async getOrders() {
    const response =  await firstValueFrom(this.ordersInfra.getOrders());
    this.ordersSubject.next(response);
  }
}
