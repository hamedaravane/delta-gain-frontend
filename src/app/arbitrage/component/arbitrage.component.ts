import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {ArbitrageFacade} from '../data-access/arbitrage.facade';
import {NzTableModule, NzTableQueryParams} from 'ng-zorro-antd/table';
import {AsyncPipe, DecimalPipe, NgClass, NgForOf, NgOptimizedImage} from '@angular/common';
import {NzSkeletonModule} from 'ng-zorro-antd/skeleton';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {FormsModule} from "@angular/forms";
import {NzSelectModule} from "ng-zorro-antd/select";
import {Arbitrage} from "../entity/arbitrage.entity";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {LottieComponent} from "ngx-lottie";
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {FixedDatePipe} from "@shared/pipe/fixed-date.pipe";
import {DeviceService} from "@shared/data-access/device.service";

@Component({
  selector: 'app-arbitrage',
  standalone: true,
  imports: [NzTableModule, AsyncPipe, NzSkeletonModule, FixedDatePipe, DecimalPipe, NzButtonModule, NzDropDownModule, NzSpaceModule, NzCheckboxModule, FormsModule, NzSkeletonModule, NzSelectModule, NgForOf, LottieComponent, NgClass, NzCardModule, NzGridModule, NgOptimizedImage, FixedDatePipe],
  templateUrl: './arbitrage.component.html',
  styleUrl: './arbitrage.component.scss'
})
export class ArbitrageComponent implements OnInit {
  arbitragesData = new Array<Arbitrage>();
  currentPage = 0;
  currentPageSize = 100;
  selectedAutoReloadInterval = 10000;
  isDesktop = DeviceService.isDesktop;
  private readonly destroyRef = inject(DestroyRef);
  private readonly arbitrageFacade = inject(ArbitrageFacade);
  arbitrages$ = this.arbitrageFacade.arbitrages$;
  isArbitragesLoading$ = this.arbitrageFacade.isArbitragesLoading$;
  totalPages = 0;

  ngOnInit(): void {
    this.arbitrageFacade.loadArbitrages(this.currentPage, this.currentPageSize).then();
    this.arbitrages$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((arbitrages) => {
      this.arbitragesData = arbitrages;
    })
    this.arbitrageFacade.arbitragesPages$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((pages) => {
      this.totalPages = pages;
    })
  }

  changePageIndex(value: number) {
    this.currentPage = value;
  }

  changePageSize(value: number) {
    this.currentPageSize = value;
    this.reload();
  }

  changeAutoReloadInterval(value: number) {
    this.selectedAutoReloadInterval = value;
    this.reload();
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    const {pageSize, pageIndex, sort, filter} = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.arbitrageFacade.loadArbitrages(pageIndex, pageSize).then();
  }

  reload() {
    this.arbitrageFacade.reloadDataSubscription.unsubscribe();
    this.arbitrageFacade.reloadArbitrages(this.currentPage, this.currentPageSize, this.selectedAutoReloadInterval);
  }
}
