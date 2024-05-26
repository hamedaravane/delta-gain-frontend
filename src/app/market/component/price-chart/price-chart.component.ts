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
import Chart, { ChartConfiguration, ChartData, ChartDataset, ChartType } from 'chart.js/auto';
import { MarketFacade } from '../../data-access/market.facade';
import { COLORS, transparent } from '@shared/constant/tailwind-colors';
import { CurrencySafeZoneApi } from '../../../currency-safe-zone/api/currency-safe-zone.api';
import { AsyncPipe } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import 'chartjs-adapter-date-fns';
import zoomPlugin from 'chartjs-plugin-zoom';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { chartData, generateChartConfiguration } from '../../constant/chart-config.constant';

Chart.register(zoomPlugin);

@Component({
  selector: 'market-price-chart',
  standalone: true,
  imports: [AsyncPipe, NzSelectModule, FormsModule, NzSpaceModule, NzTimePickerModule],
  templateUrl: './price-chart.component.html',
  styleUrl: './price-chart.component.scss'
})
export class PriceChartComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly currencySafeZoneApi = inject(CurrencySafeZoneApi);
  private readonly destroyRef = inject(DestroyRef);
  private readonly marketFacade = inject(MarketFacade);
  private readonly nzMessageService = inject(NzMessageService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  chartData = chartData;
  private chartConfiguration = generateChartConfiguration(this.chartData);
  currencySafeZones$ = this.currencySafeZoneApi.currencySafeZones$;
  priceChart!: Chart;
  @ViewChild('priceChartEl') priceChartEl!: ElementRef<HTMLCanvasElement>;
  selectedCurrency = 'GMX';
  startTimeChart: Date = new Date(new Date().getTime() - 1000 * 60 * 3);

  ngOnInit() {
    const currencyId = this.route.snapshot.paramMap.get('currencyId');
    if (currencyId) {
      this.selectedCurrency = currencyId;
    }
  }

  ngAfterViewInit() {
    this.createChart();
  }

  clearChart() {
    this.priceChart.clear();
    this.chartData.labels = [];
    this.chartData.datasets.map((dataset) => dataset.data = []);
  }

  createChart() {
    this.updateChart(this.selectedCurrency, this.startTimeChart);
    this.priceChart = new Chart(this.priceChartEl.nativeElement, this.chartConfiguration);
  }

  ngOnDestroy() {
    if (this.priceChart) {
      this.priceChart.destroy();
    }
  }

  onCurrencyChange(currency: string) {
    this.updateChart(currency, this.startTimeChart);
    this.selectedCurrency = currency;
    this.router.navigateByUrl(currency).catch(() => {
      this.nzMessageService.error('Invalid route');
    });
    this.priceChart.update();
  }

  onStartTimeChange(time: Date) {
    this.updateChart(this.selectedCurrency, time);
    this.startTimeChart = time;
    this.priceChart.update();
  }

  updateChart(currency: string, time: Date) {
    this.marketFacade.getMarketChartData$(currency, time).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data) => {
      this.clearChart();
      data.forEach((item) => {
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
      this.chartData.labels = data.map((item) => item.createdAt!.getTime());

      // Update the chart
      if (this.priceChart) {
        this.priceChart.update();
      }
    });
  }
}
