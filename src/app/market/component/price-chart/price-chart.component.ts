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
  currentPageSize = 1000;
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
      backgroundColor: COLORS.purple_5,
      pointBackgroundColor: COLORS.purple_5,
      pointBorderColor: COLORS.purple_5,
      showLine: false,
      pointRadius: 6
    }, {
      label: 'Sell Points',
      data: [],
      backgroundColor: COLORS.rose_5,
      pointBackgroundColor: COLORS.rose_5,
      pointBorderColor: COLORS.purple_5,
      showLine: false,
      pointRadius: 6
    }],
    labels: []
  };
  private chartConfiguration: ChartConfiguration = {
    type: 'line', data: this.chartData, options: {
      aspectRatio: 2.1, normalized: true, maintainAspectRatio: true, elements: {
        line: {
          tension: 0.3
        }
      }
    }
  };
  arbitrages$ = this.arbitrageApi.getArbitrages(this.currentPageSize, this.currentPage, [{
    key: 'currencyBase',
    operator: '_eq',
    value: this.selectedCurrency
  }]);

  ngOnInit() {
    this.marketFacade.loadMarketContentData([{
      key: 'currencyBase',
      operator: '_eq',
      value: this.selectedCurrency
    }], this.currentPageSize, this.currentPage).then();
  }

  ngAfterViewInit() {
    this.priceChart = new Chart(this.priceChartEl.nativeElement, this.chartConfiguration);
    this.createChart();
  }

  onCurrencyChange(currency: string) {
    this.clearChart();
    this.selectedCurrency = currency;
    this.marketFacade.loadMarketContentData([{
      key: 'currencyBase',
      operator: '_eq',
      value: currency
    }], this.currentPageSize).then();
    this.arbitrages$ = this.arbitrageApi.getArbitrages(this.currentPageSize, this.currentPage, [{
      key: 'currencyBase',
      operator: '_eq',
      value: currency
    }]);
  }

  onPageSizeChange(pageSize: number) {
    this.clearChart();
    this.currentPageSize = pageSize;
    this.marketFacade.loadMarketContentData([{
      key: 'currencyBase',
      operator: '_eq',
      value: this.selectedCurrency
    }], pageSize).then();
    this.arbitrages$ = this.arbitrageApi.getArbitrages(pageSize, this.currentPage, [{
      key: 'currencyBase',
      operator: '_eq',
      value: this.selectedCurrency
    }]);
  }

  private generateChartLabels(time: Date | undefined): string {
    if (!time) {
      return '';
    }
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();
    return `${hour}:${minute}:${second}`;
  }

  clearChart() {
    this.priceChart.clear();
    this.chartData.labels = [];
    this.chartData.datasets.map((dataset) => dataset.data = []);
  }

  createChart() {
    this.marketContent$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((markets) => {
      for (const market of markets) {
        this.chartData.datasets[0].data.push(market.bestAskBase);
        this.chartData.datasets[1].data.push(market.bestAskVuln);
        this.chartData.datasets[2].data.push(market.bestBidVuln);
        this.chartData.labels?.push(this.generateChartLabels(market.createdAt));
      }
      if (this.priceChart) {
        this.priceChart.update();
      }
    });
    this.arbitrages$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((arbitrages) => {
      for (const arbitrage of arbitrages) {
        this.chartData.datasets[3].data.push(arbitrage.buyTarget);
        this.chartData.datasets[4].data.push(arbitrage.sellTarget);
        this.chartData.labels?.push(this.generateChartLabels(arbitrage.createdAt));
      }
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
