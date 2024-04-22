import {AfterViewInit, Component, ElementRef, inject, OnDestroy, TemplateRef, ViewChild} from '@angular/core';
import {init, dispose, KLineData} from 'klinecharts';
import { customStyle } from './constant/chart-style';
import {BinanceFacade} from "./data-access/binance.facade";

@Component({
  selector: 'app-market',
  standalone: true,
  imports: [],
  templateUrl: './market.component.html',
  styleUrl: './market.component.scss'
})
export class MarketComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  private readonly binanceFacade = inject(BinanceFacade);
  private readonly binanceChartData$ = this.binanceFacade.binanceChartData$;
  klineData = [];

  ngAfterViewInit(): void {
    const chartElement = this.chartCanvas.nativeElement;
    const chart = init(chartElement, {
      styles: customStyle,
      timezone: 'Asia/Tehran',
      locale: 'en-US'
    });
    this.binanceChartData$.subscribe((data) => {
      const klineData: KLineData[] = new Array.from<KLineData>({...data.kline});
      chart?.applyNewData(klineData);
    })
  }

  ngOnDestroy(): void {
    const chartElement = this.chartCanvas.nativeElement;
    dispose(chartElement);
  }
}
