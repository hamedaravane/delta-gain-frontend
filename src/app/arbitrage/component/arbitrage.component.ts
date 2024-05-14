import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {ArbitrageFacade} from '../data-access/arbitrage.facade';
import {NzTableModule} from 'ng-zorro-antd/table';
import {AsyncPipe, DatePipe, DecimalPipe, NgClass, NgForOf, NgOptimizedImage} from '@angular/common';
import {NzSkeletonModule} from 'ng-zorro-antd/skeleton';
import {arbitragesTableConstant, dateFormats} from '../constant/arbitrages-table.constant';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {FormsModule} from "@angular/forms";
import {NzSelectModule} from "ng-zorro-antd/select";
import {Arbitrage} from "../entity/arbitrage.entity";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {LottieComponent} from "ngx-lottie";
import {DesktopComponent} from '@shared/components/desktop/desktop.component';
import {MobileComponent} from '@shared/components/mobile/mobile.component';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzGridModule} from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-arbitrage',
  standalone: true,
  imports: [NzTableModule, AsyncPipe, NzSkeletonModule, DatePipe, DecimalPipe,
    NzButtonModule, NzDropDownModule,
    NzSpaceModule, NzCheckboxModule, FormsModule, NzSkeletonModule,
    NzSelectModule, NgForOf, LottieComponent, NgClass, DesktopComponent, MobileComponent, NzCardModule, NzGridModule, NgOptimizedImage
  ],
  templateUrl: './arbitrage.component.html',
  styleUrl: './arbitrage.component.scss'
})
export class ArbitrageComponent implements OnInit {
  arbitragesTableConstant = signal(arbitragesTableConstant);
  dateFormats = dateFormats;
  selectedDateFormat = signal('yy/M/d H:mm:s');
  pageSizes = [20, 50, 100];
  selectedPageSize = signal(20);
  pageIndex = signal(0);
  arbitragesData = new Array<Arbitrage>();
  selectedAutoReloadInterval = signal(10000);
  private readonly arbitrageFacade = inject(ArbitrageFacade);
  arbitrages$ = this.arbitrageFacade.arbitrages$;
  arbitragesPages$ = this.arbitrageFacade.arbitragesPages$;
  isArbitragesLoading$ = this.arbitrageFacade.isArbitragesLoading$;
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.arbitrageFacade.loadArbitrages().then();
    this.changeAutoReloadInterval(this.selectedAutoReloadInterval());
    this.arbitrages$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((arbitrages) => {
      this.arbitragesData = arbitrages;
    })
  }

  changePageIndex(pageIndex: number) {
    this.pageIndex.set(pageIndex);
  }

  changePageSize(value: number) {
    this.selectedPageSize.set(value);
    this.reload();
  }

  changeAutoReloadInterval(value: number) {
    this.selectedAutoReloadInterval.set(value);
    this.reload();
  }

  reload() {
    this.arbitrageFacade.reloadArbitrages().unsubscribe();
    this.arbitrageFacade.reloadArbitrages(this.pageIndex(), this.selectedPageSize(), this.selectedAutoReloadInterval());
  }

  changeColumnVisibility(value: boolean, key: string) {
    const selectedTable = arbitragesTableConstant.find(table => table.columnKey === key)!;
    this.arbitragesTableConstant.set(arbitragesTableConstant.map(table => {
      if (table.columnKey === selectedTable.columnKey) {
        return {...table, isVisible: value};
      } else return table;
    }));
  }
}
