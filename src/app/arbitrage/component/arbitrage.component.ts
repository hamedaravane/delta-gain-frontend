import { Component, inject, OnInit } from '@angular/core';
import { ArbitrageFacade } from '../data-access/arbitrage.facade';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { AsyncPipe } from '@angular/common';
import {
  NzSkeletonComponent,
  NzSkeletonElementDirective,
  NzSkeletonElementInputComponent
} from 'ng-zorro-antd/skeleton';

@Component({
  selector: 'app-arbitrage',
  standalone: true,
  imports: [
    NzTableComponent,
    AsyncPipe,
    NzSkeletonElementDirective,
    NzSkeletonComponent,
    NzSkeletonElementInputComponent
  ],
  templateUrl: './arbitrage.component.html',
  styleUrl: './arbitrage.component.scss'
})
export class ArbitrageComponent implements OnInit {
  private readonly arbitrageFacade = inject(ArbitrageFacade);
  arbitrages$ = this.arbitrageFacade.arbitrages$;
  arbitragesPages$ = this.arbitrageFacade.arbitragesPages$;
  isArbitragesLoading$ = this.arbitrageFacade.isArbitragesLoading$;

  ngOnInit(): void {
    this.arbitrageFacade.loadArbitrages().then();
  }

  changePage(page: number) {
    this.arbitrageFacade.loadArbitrages(page).then();
  }
}
