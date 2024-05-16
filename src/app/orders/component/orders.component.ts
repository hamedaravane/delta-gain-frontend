import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {NzTableModule} from 'ng-zorro-antd/table';
import {OrdersFacade} from '@orders/data-access/orders.facade';
import {AsyncPipe, DatePipe, DecimalPipe, NgClass} from '@angular/common';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Order} from '@orders/entity/order.entity';
import {DesktopComponent} from "@shared/components/desktop/desktop.component";
import {MobileComponent} from "@shared/components/mobile/mobile.component";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {ordersTableHeader} from "@orders/constant/orders-table-header";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    AsyncPipe,
    NgClass,
    DecimalPipe,
    DatePipe,
    NzTableModule,
    NzCardModule,
    NzGridModule,
    NzSpaceModule,
    DesktopComponent,
    MobileComponent
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  orderTableHeader = ordersTableHeader;
  ordersData = new Array<Order>();
  currentPage = signal(0);
  currentPageSize = signal(20);
  selectedAutoReloadInterval = signal(10000);
  private readonly ordersFacade = inject(OrdersFacade);
  orders$ = this.ordersFacade.orders$;
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
