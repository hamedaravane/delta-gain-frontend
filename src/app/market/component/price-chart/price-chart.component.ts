import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnDestroy,
  OnInit, signal,
  ViewChild
} from '@angular/core';
import Chart, { ChartConfiguration, ChartData } from 'chart.js/auto';
import { MarketFacade } from '../../data-access/market.facade';
import { Observable } from 'rxjs';
import { ContentItem } from '../../entity/market.entity';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { COLORS, transparent } from '@shared/constant/tailwind-colors';
import { CurrencySafeZoneApi } from '../../../currency-safe-zone/api/currency-safe-zone.api';
import { AsyncPipe } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'market-price-chart',
  standalone: true,
  imports: [
    AsyncPipe,
    NzSelectModule,
    FormsModule,
    NzSpaceModule
  ],
  templateUrl: './price-chart.component.html',
  styleUrl: './price-chart.component.scss'
})
export class PriceChartComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly destroyRef = inject(DestroyRef);
  private readonly marketFacade = inject(MarketFacade);
  private readonly currencySafeZoneApi = inject(CurrencySafeZoneApi);
  selectedCurrency = signal<string>('SHIB');
  currentPageSize = signal(50);
  currentPage = signal(0);
  currencySafeZones$ = this.currencySafeZoneApi.currencySafeZones$;
  @ViewChild('priceChartEl') priceChartEl!: ElementRef<HTMLCanvasElement>;
  priceChart!: Chart;
  chartData: ChartData = {
    datasets: [
      {
        label: 'Binance Ask',
        data: [],
        borderColor: transparent(COLORS.orange_5, 0.5),
        fill: false,
        pointRadius: 0
      },
      {
        label: 'Binance Bid',
        data: [],
        borderColor: transparent(COLORS.amber_5, 0.5),
        fill: false,
        pointRadius: 0
      },
      {
        label: 'OMP Ask',
        data: [],
        borderColor: COLORS.rose_5,
        fill: false,
        pointRadius: 0
      },
      {
        label: 'OMP Bid',
        data: [],
        borderColor: COLORS.green_5,
        fill: false,
        pointRadius: 0
      },
      /*{
        label: 'Buy Points',
        data: [],
        backgroundColor: COLORS.green_5,
        pointBackgroundColor: COLORS.green_5,
        pointBorderColor: COLORS.green_5,
        showLine: false,
        pointRadius: 6
      },
      {
        label: 'Sell Points',
        data: [],
        backgroundColor: COLORS.rose_5,
        pointBackgroundColor: COLORS.rose_5,
        pointBorderColor: COLORS.rose_5,
        showLine: false,
        pointRadius: 6
      }*/
    ],
    labels: []
  };
  private chartConfiguration: ChartConfiguration = {
    type: 'line',
    data: this.chartData,
    options: {
      aspectRatio: 2.1,
      normalized: true,
      maintainAspectRatio: true,
      elements: {
        line: {
          tension: 0.3
        }
      }
    }
  };
  marketContent$: Observable<ContentItem[]> = this.marketFacade.marketContent$;

  ngOnInit() {
    this.marketFacade.loadMarketContentData([{key: 'currencyBase', operator: '_eq', value: this.selectedCurrency()}]).then();
  }

  onCurrencyChange(currency: string) {
    this.priceChart.clear();
    this.chartData.labels = [];
    this.chartData.datasets.map((dataset) => dataset.data = [])
    this.selectedCurrency.set(currency);
    this.marketFacade.loadMarketContentData([{key: 'currencyBase', operator: '_eq', value: this.selectedCurrency()}]).then();
  }

  ngAfterViewInit() {
    this.priceChart = new Chart(this.priceChartEl.nativeElement, this.chartConfiguration);
    this.createChart();
  }

  createChart(){
    this.marketContent$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(content => {
      for (const contentItem of content) {
        this.chartData.datasets[0].data.push(contentItem.bestAskBase);
        this.chartData.datasets[1].data.push(contentItem.bestBidBase);
        this.chartData.datasets[2].data.push(contentItem.bestAskVuln);
        this.chartData.datasets[3].data.push(contentItem.bestBidVuln);
        this.chartData.labels?.push(this.generateChartLabels(contentItem.createdAt));
      }
      if (this.priceChart) {
        this.priceChart.update();
      }
    });
  }

  private generateChartLabels(time: Date): string {
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();
    return `${hour}:${minute}:${second}`;
  }

  ngOnDestroy() {
    if (this.priceChart) {
      this.priceChart.destroy();
    }
  }
}
