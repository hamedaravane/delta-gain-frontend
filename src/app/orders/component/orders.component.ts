import {Component, inject} from '@angular/core';
import {NzTableComponent, NzThAddOnComponent} from 'ng-zorro-antd/table';
import {OrdersFacade} from '@orders/data-access/orders.facade';
import {AsyncPipe, CurrencyPipe, DatePipe, DecimalPipe, KeyValuePipe, NgClass} from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    NzTableComponent,
    AsyncPipe,
    KeyValuePipe,
    DatePipe,
    NzThAddOnComponent,
    CurrencyPipe,
    DecimalPipe,
    NgClass
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  private readonly ordersFacade = inject(OrdersFacade);
}
