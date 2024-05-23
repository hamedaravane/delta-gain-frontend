import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import Chart, { ChartConfiguration, ChartData } from 'chart.js/auto';
import { MarketFacade } from '../../data-access/market.facade';
import { combineLatestWith, Observable } from 'rxjs';
import { ContentItem } from '../../entity/market.entity';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { COLORS, transparent } from '@shared/constant/tailwind-colors';
import { CurrencySafeZoneApi } from '../../../currency-safe-zone/api/currency-safe-zone.api';
import { AsyncPipe } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { ArbitrageApi } from '../../../arbitrage/api/arbitrage.api';
import 'chartjs-adapter-date-fns';

@Component({
  selector: 'market-price-chart',
  standalone: true,
  imports: [AsyncPipe, NzSelectModule, FormsModule, NzSpaceModule],
  templateUrl: './price-chart.component.html',
  styleUrl: './price-chart.component.scss'
})
export class PriceChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('priceChartEl') priceChartEl!: ElementRef<HTMLCanvasElement>;
  private readonly arbitrageApi = inject(ArbitrageApi);
  private readonly currencySafeZoneApi = inject(CurrencySafeZoneApi);
  private readonly destroyRef = inject(DestroyRef);
  private readonly marketFacade = inject(MarketFacade);
  currencySafeZones$ = this.currencySafeZoneApi.currencySafeZones$;
  priceChart!: Chart;
  currentPage = 0;
  currentPageSize = 20;
  marketContent$: Observable<ContentItem[]> = this.marketFacade.marketContent$;
  selectedCurrency = 'GMX';
  chartData: ChartData = {
    datasets: [{
      label: 'Binance',
      data: [],
      borderColor: transparent(COLORS.amber_5, 0.5),
      fill: false,
      pointRadius: 0
    }, {
      label: 'OMP Ask',
      data: [],
      borderColor: COLORS.rose_5,
      fill: false,
      pointRadius: 0
    }, {
      label: 'OMP Bid',
      data: [],
      borderColor: COLORS.green_5,
      fill: false,
      pointRadius: 0
    }, {
      label: 'Buy Points',
      data: [],
      backgroundColor: COLORS.green_5,
      pointBackgroundColor: COLORS.green_5,
      showLine: false,
      pointRadius: 6
    }, {
      label: 'Sell Points',
      data: [],
      backgroundColor: COLORS.rose_5,
      pointBackgroundColor: COLORS.rose_5,
      showLine: false,
      pointRadius: 6
    }],
    labels: []
  };
  private chartConfiguration: ChartConfiguration = {
    type: 'line', data: this.chartData, options: {
      aspectRatio: 2.1,
      normalized: true,
      maintainAspectRatio: true,
      elements: {
        line: {
          tension: 0.3
        }
      },
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day',
            displayFormats: {
              day: 'MMM dd',
              month: 'MMM yyyy'
            }
          },
          ticks: {
            source: 'auto',
            autoSkip: true,
            maxRotation: 0,
            minRotation: 0
          }
        },
        y: {
          beginAtZero: true
        }
      }
    }
  };
  arbitrages$ = this.arbitrageApi.getArbitrages(this.currentPage, this.currentPageSize, [{
    key: 'currencyBase',
    operator: '_eq',
    value: this.selectedCurrency
  }]);

  ngOnInit() {
    this.marketFacade.loadMarketContentData([{
      key: 'currencyBase',
      operator: '_eq',
      value: this.selectedCurrency
    }], this.currentPageSize + 30, this.currentPage).then();
  }

  ngAfterViewInit() {
    this.priceChart = new Chart(this.priceChartEl.nativeElement, this.chartConfiguration);
    this.createChart();
  }

  onCurrencyChange(currency: string) {
    this.clearChart();
    this.selectedCurrency = currency;
    this.reloadData();
  }

  onPageSizeChange(pageSize: number) {
    this.clearChart();
    this.currentPageSize = pageSize;
    this.reloadData();
  }

  clearChart() {
    this.priceChart.clear();
    this.chartData.labels = [];
    this.chartData.datasets.map((dataset) => dataset.data = []);
  }

  reloadData() {
    this.clearChart();
    this.marketFacade.loadMarketContentData([{
      key: 'currencyBase',
      operator: '_eq',
      value: this.selectedCurrency
    }], this.currentPageSize + 30).then();
    this.arbitrages$ = this.arbitrageApi.getArbitrages(this.currentPage, this.currentPageSize, [{
      key: 'currencyBase',
      operator: '_eq',
      value: this.selectedCurrency
    }]);
  }

  createChart() {
    this.marketContent$.pipe(
      takeUntilDestroyed(this.destroyRef),
      combineLatestWith(this.arbitrages$)
    ).subscribe(([markets, arbitrages]) => {
      this.clearChart();

      // Merge and sort the datasets by timestamp
      const union = [...markets, ...arbitrages].sort((a, b) => a.createdAt!.getTime() - b.createdAt!.getTime());

      // Process each item in the sorted union array
      union.forEach((item) => {
        if ('bestAskBase' in item) {
          // Market data
          this.chartData.datasets[0].data.push({
            x: item.createdAt.getTime(),
            y: item.bestAskBase
          });
          this.chartData.datasets[1].data.push({
            x: item.createdAt.getTime(),
            y: item.bestAskVuln
          });
          this.chartData.datasets[2].data.push({
            x: item.createdAt.getTime(),
            y: item.bestBidVuln
          });
        } else if ('buyTarget' in item) {
          // Arbitrage data
          this.chartData.datasets[3].data.push({
            x: item.createdAt!.getTime(),
            y: item.buyTarget
          });
          this.chartData.datasets[4].data.push({
            x: item.createdAt!.getTime(),
            y: item.sellTarget
          });
        }
      });

      // Update labels with timestamps
      this.chartData.labels = union.map((item) => item.createdAt!.getTime());

      // Update the chart
      if (this.priceChart) {
        this.priceChart.update();
      }
    });
  }

  ngOnDestroy() {
    if (this.priceChart) {
      this.priceChart.destroy();
    }
  }
}
