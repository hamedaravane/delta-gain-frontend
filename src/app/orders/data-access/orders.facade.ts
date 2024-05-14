import {inject, Injectable} from '@angular/core';
import {OrdersInfra} from '@orders/infrastructure/orders.infra';
import {NzMessageService} from 'ng-zorro-antd/message';

@Injectable({providedIn: 'root'})
export class OrdersFacade {
  private readonly ordersInfra = inject(OrdersInfra);
  private readonly nzMessageService = inject(NzMessageService);
}
