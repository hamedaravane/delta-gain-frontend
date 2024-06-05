import {Component, DestroyRef, inject, OnDestroy, OnInit, signal} from '@angular/core';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import {OrdersFacade} from '@orders/data-access/orders.facade';
import {AsyncPipe, DecimalPipe, NgClass, NgOptimizedImage} from '@angular/common';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Order} from '@orders/entity/order.entity';
import {NzCardModule} from "ng-zorro-antd/card";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzSelectModule} from "ng-zorro-antd/select";
import {FormsModule} from "@angular/forms";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {FixedDatePipe} from "@shared/pipe/fixed-date.pipe";
import {DeviceService} from "@shared/data-access/device.service";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [AsyncPipe, NgClass, DecimalPipe, FixedDatePipe, NgOptimizedImage, NzTableModule, NzCardModule, NzGridModule, NzSpaceModule, NzButtonModule, NzSelectModule, FormsModule, NzCheckboxModule, NzDropDownModule,],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit, OnDestroy {
  ordersData = new Array<Order>();
  isDesktop = DeviceService.isDesktop;
  currentPage = 0;
  currentPageSize = 100;
  totalPages = 0;
  selectedAutoReloadInterval = 10000;
  private readonly destroyRef = inject(DestroyRef);
  private readonly ordersFacade = inject(OrdersFacade);
  orders$ = this.ordersFacade.orders$;
  isOrdersLoading$ = this.ordersFacade.isOrdersLoading$;

  ngOnInit(): void {
    this.ordersFacade.loadOrders(this.currentPage, this.currentPageSize).then();
    this.orders$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((orders) => {
      this.ordersData = orders;
    })
    this.ordersFacade.ordersPages$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((pages) => {
      this.totalPages = pages.totalPages;
    })
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    const {pageSize, pageIndex, sort, filter} = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.ordersFacade.loadOrders(pageIndex, pageSize).then();
  }

  changePageIndex(pageIndex: number) {
    this.currentPage = pageIndex;
  }

  changePageSize(value: number) {
    this.currentPageSize = value;
    this.reload();
  }

  changeAutoReloadInterval(value: number) {
    this.selectedAutoReloadInterval = value;
    this.reload();
  }

  reload() {
    this.ordersFacade.reloadDataSubscription.unsubscribe();
    this.ordersFacade.reloadOrders(this.currentPage, this.currentPageSize, this.selectedAutoReloadInterval);
  }

  ngOnDestroy() {
    this.ordersFacade.reloadDataSubscription.unsubscribe();
  }
}
