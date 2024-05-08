import { Component, inject, OnInit } from '@angular/core';
import { ArbitrageFacade } from '../data-access/arbitrage.facade';
import { NzCellAlignDirective, NzTableComponent, NzTableModule } from 'ng-zorro-antd/table';
import {
  AsyncPipe,
  DatePipe,
  DecimalPipe,
  JsonPipe,
  KeyValuePipe,
  NgTemplateOutlet
} from '@angular/common';
import {
  NzSkeletonComponent,
  NzSkeletonElementDirective,
  NzSkeletonElementInputComponent, NzSkeletonModule
} from 'ng-zorro-antd/skeleton';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { arbitragesTableConstant } from './arbitrages-table.constant';
import { keyframes } from '@angular/animations';
import { NzButtonComponent, NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSpaceComponent, NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'app-arbitrage',
  standalone: true,
  imports: [
    NzTableModule,
    AsyncPipe,
    NzSkeletonModule,
    DatePipe,
    DecimalPipe,
    NzButtonModule,
    NzDropDownModule,
    NzSpaceModule
  ],
  templateUrl: './arbitrage.component.html',
  styleUrl: './arbitrage.component.scss'
})
export class ArbitrageComponent implements OnInit {
  private readonly arbitrageFacade = inject(ArbitrageFacade);
  arbitragesTableConstant = arbitragesTableConstant;
  arbitrages$ = this.arbitrageFacade.arbitrages$;
  arbitragesPages$ = this.arbitrageFacade.arbitragesPages$;
  isArbitragesLoading$ = this.arbitrageFacade.isArbitragesLoading$;

  ngOnInit(): void {
    this.arbitrageFacade.loadArbitrages().then();
  }

  changePage(page: number) {
    this.arbitrageFacade.loadArbitrages(page).then();
  }

  protected readonly String = String;
}
