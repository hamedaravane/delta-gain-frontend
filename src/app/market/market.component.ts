import { AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { init, dispose, KLineData, Nullable, Chart } from 'klinecharts';
import { customStyle } from './constant/chart-style';
import { BinanceFacade } from "./data-access/binance.facade";
import {from, Subscription, tap} from 'rxjs';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { OmpfinexFacade } from 'src/app/market/data-access/ompfinex.facade';
import { OmpfinexMarket } from './entity/ompfinex.entity';
import {AsyncPipe, NgOptimizedImage} from '@angular/common';
import {NzSkeletonElementDirective, NzSkeletonElementInputComponent} from "ng-zorro-antd/skeleton";

@Component({
  selector: 'app-market',
  standalone: true,
  imports: [
    NzSelectComponent,
    NzOptionComponent,
    FormsModule,
    AsyncPipe,
    NgOptimizedImage,
    NzSkeletonElementDirective,
    NzSkeletonElementInputComponent
  ],
  templateUrl: './market.component.html',
  styleUrl: './market.component.scss'
})
export class MarketComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  chartElement!: HTMLCanvasElement;
  chart!: Nullable<Chart>;
  private readonly binanceFacade = inject(BinanceFacade);
  private readonly ompfinexFacade = inject(OmpfinexFacade);
  private readonly binanceChartData$ = this.binanceFacade.binanceChartData$;
  private chartDataSubscription = new Subscription();
  private kLineData = new Array<KLineData>();
  ompfinexMarkets$ = this.ompfinexFacade.ompfinexMarketsSubject.asObservable();
  ompfinexMarketsLoading$ = this.ompfinexFacade.ompfinexMarketsLoading$;
  selectedSymbol = signal<OmpfinexMarket | null>(null);

  ngOnInit() {
    this.ompfinexFacade.getUsdtMarkets();
    this.binanceFacade.createConnection();
  }

  ngAfterViewInit() {
    this.chartElement = this.chartCanvas.nativeElement;
    this.chart = init(this.chartElement, {
      styles: customStyle,
      timezone: 'Asia/Tehran',
      locale: 'en-US'
    });
    this.chartDataSubscription = this.binanceChartData$.subscribe((data) => {
      this.kLineData.push(data);
      this.chart?.applyNewData(this.kLineData);
    })
  }

  changeSymbol(event: OmpfinexMarket) {
    this.selectedSymbol.set(event);
    this.binanceFacade.unsubscribe();
    this.kLineData = [];
    this.binanceFacade.subscription(event.symbol);
  }

  ngOnDestroy() {
    this.chartDataSubscription.unsubscribe();
    this.kLineData = [];
    dispose(this.chartElement);
    this.binanceFacade.unsubscribe();
  }
}
