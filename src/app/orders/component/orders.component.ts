import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import {NzTableComponent, NzThAddOnComponent} from 'ng-zorro-antd/table';
import {OrdersFacade} from '@orders/data-access/orders.facade';
import {AsyncPipe, CurrencyPipe, DatePipe, DecimalPipe, KeyValuePipe, NgClass} from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Arbitrage } from '../../arbitrage/entity/arbitrage.entity';
import { Order } from '@orders/entity/order.entity';

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
export class OrdersComponent implements OnInit {
  private readonly ordersFacade = inject(OrdersFacade);
  orders$ = this.ordersFacade.orders$;
  ordersData = new Array<Order>();
  currentPage = signal(0);
  currentPageSize = signal(20);
  selectedAutoReloadInterval = signal(10000);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.ordersFacade.loadOrders(this.currentPage(), this.currentPageSize()).then();
    this.orders$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((orders) => {
      this.ordersData = orders;
    })
  }

  changePageIndex(pageIndex: number) {
    this.currentPage.set(pageIndex);
  }

  changePageSize(value: number) {
    this.currentPageSize.set(value);
    this.reload();
  }

  changeAutoReloadInterval(value: number) {
    this.selectedAutoReloadInterval.set(value);
    this.reload();
  }

  reload() {
    this.ordersFacade.reloadDataSubscription.unsubscribe();
    this.ordersFacade.reloadOrders(this.currentPage(), this.currentPageSize(), this.selectedAutoReloadInterval());
  }
}
