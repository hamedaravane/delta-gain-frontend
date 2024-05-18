import {Component, DestroyRef, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {NzTableModule} from 'ng-zorro-antd/table';
import {OrdersFacade} from '@orders/data-access/orders.facade';
import {AsyncPipe, DatePipe, DecimalPipe, NgClass, NgOptimizedImage} from '@angular/common';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Order} from '@orders/entity/order.entity';
import {DesktopComponent} from "@shared/components/desktop/desktop.component";
import {MobileComponent} from "@shared/components/mobile/mobile.component";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {ordersTableHeader} from "@orders/constant/orders-table-header";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzSelectModule} from "ng-zorro-antd/select";
import {FormsModule} from "@angular/forms";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {FixedDatePipe} from "@shared/pipe/fixed-date.pipe";

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
    MobileComponent,
    NzButtonModule,
    NzSelectModule,
    FormsModule,
    NzCheckboxModule,
    NzDropDownModule,
    NgOptimizedImage,
    FixedDatePipe
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit, OnDestroy {
  private readonly destroyRef = inject(DestroyRef);
  orderTableHeader = ordersTableHeader;
  ordersData = new Array<Order>();
  currentPage = signal(0);
  currentPageSize = signal(20);
  selectedAutoReloadInterval = signal(10000);
  private readonly ordersFacade = inject(OrdersFacade);
  orders$ = this.ordersFacade.orders$;
  isOrdersLoading$ = this.ordersFacade.isOrdersLoading$;

  ngOnInit(): void {
    this.ordersFacade.loadOrders(this.currentPage(), this.currentPageSize()).then(() => this.reload());
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

  changeColumnVisibility(isVisible: boolean, columnName: string) {
    this.orderTableHeader.set(columnName, isVisible);
  }

  ngOnDestroy() {
    this.ordersFacade.reloadDataSubscription.unsubscribe();
  }
}
