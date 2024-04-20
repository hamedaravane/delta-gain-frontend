import { inject, Injectable } from '@angular/core';
import { OrdersInfra } from '@orders/infrastructure/orders.infra';

@Injectable({providedIn: 'root'})
export class OrdersFacade {
  private readonly ordersInfra = inject(OrdersInfra);
}
