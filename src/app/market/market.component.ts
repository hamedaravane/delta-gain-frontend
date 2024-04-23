import { AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { init, dispose, KLineData, Nullable, Chart } from 'klinecharts';
import { customStyle } from './constant/chart-style';
import { BinanceFacade } from "./data-access/binance.facade";
import { from, Subscription } from 'rxjs';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { OmpfinexFacade } from 'src/app/market/data-access/ompfinex.facade';

@Component({
  selector: 'app-market',
  standalone: true,
  imports: [
    NzSelectComponent,
    NzOptionComponent,
    FormsModule
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
  private ompfinexMarketsSubscription = new Subscription();
  private readonly binanceChartData$ = this.binanceFacade.binanceChartData$;
  private chartDataSubscription = new Subscription();
  private kLineData = new Array<KLineData>();
  selectedSymbol: string = 'btcusdt';
  symbols = signal<string[]>([]);

  ngOnInit() {
    this.ompfinexMarketsSubscription = this.ompfinexFacade.ompfinexMarketsSubject.asObservable().subscribe((value) => {
      this.symbols.set(value.map(market => market.symbol));
    });
    this.binanceFacade.createConnection();
    this.binanceFacade.subscription(this.selectedSymbol);
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

  changeSymbol(event: string) {
    this.selectedSymbol = event;
    this.binanceFacade.unsubscribe();
    this.kLineData = [];
    this.binanceFacade.subscription(event);
  }

  ngOnDestroy() {
    this.chartDataSubscription.unsubscribe();
    this.ompfinexMarketsSubscription.unsubscribe();
    dispose(this.chartElement);
  }
}
