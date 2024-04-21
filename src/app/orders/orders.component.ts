import { Component, inject, OnInit } from '@angular/core';
import { NzTableComponent, NzThAddOnComponent } from 'ng-zorro-antd/table';
import { OrdersFacade } from '@orders/data-access/orders.facade';
import { AsyncPipe, CurrencyPipe, DatePipe, DecimalPipe, KeyValuePipe } from '@angular/common';
import { headers } from '@orders/constant/orders-table-header';

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
    DecimalPipe
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  private readonly ordersFacade = inject(OrdersFacade);
  orders$ = this.ordersFacade.orders$;
  headers = headers;

  ngOnInit() {
    this.ordersFacade.getOrders().then();
  }
}
