import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {ArbitrageFacade} from '../data-access/arbitrage.facade';
import {NzTableModule} from 'ng-zorro-antd/table';
import {AsyncPipe, DatePipe, DecimalPipe, NgClass, NgForOf} from '@angular/common';
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

@Component({
  selector: 'app-arbitrage',
  standalone: true,
  imports: [NzTableModule, AsyncPipe, NzSkeletonModule, DatePipe, DecimalPipe,
    NzButtonModule, NzDropDownModule,
    NzSpaceModule, NzCheckboxModule, FormsModule,
    NzSelectModule, NgForOf, LottieComponent, NgClass
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
  selectedAutoReloadInterval = signal(3000);
  private readonly arbitrageFacade = inject(ArbitrageFacade);
  arbitrages$ = this.arbitrageFacade.arbitrages$;
  arbitragesPages$ = this.arbitrageFacade.arbitragesPages$;
  isArbitragesLoading$ = this.arbitrageFacade.isArbitragesLoading$;
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.arbitrageFacade.loadArbitrages().then();
    this.arbitrages$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((arbitrages) => {
      this.arbitragesData = arbitrages;
    })
  }

  changePageIndex(pageIndex: number) {
    this.pageIndex.set(pageIndex);
    this.arbitrageFacade.loadArbitrages(pageIndex, this.selectedPageSize()).then(() => {
      this.changeAutoReloadInterval(this.selectedAutoReloadInterval());
    });
  }

  changePageSize(value: number) {
    this.selectedPageSize.set(value);
    this.arbitrageFacade.loadArbitrages(this.pageIndex(), value).then();
  }

  changeAutoReloadInterval(value: number) {
    this.selectedAutoReloadInterval.set(value);
    this.arbitrageFacade.reloadArbitrages(this.pageIndex(), this.selectedPageSize(), value).then();
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
