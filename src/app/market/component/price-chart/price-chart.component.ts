import {AfterViewInit, Component, DestroyRef, ElementRef, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import Chart, {
  ChartConfiguration,
  ChartData,
  ChartDataset,
  ChartType,
  Point
} from 'chart.js/auto';
import {MarketFacade} from '../../data-access/market.facade';
import {combineLatestWith, Observable} from 'rxjs';
import {Market} from '../../entity/market.entity';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {COLORS, transparent} from '@shared/constant/tailwind-colors';
import {CurrencySafeZoneApi} from '../../../currency-safe-zone/api/currency-safe-zone.api';
import {AsyncPipe} from '@angular/common';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {FormsModule} from '@angular/forms';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {ArbitrageApi} from '../../../arbitrage/api/arbitrage.api';
import 'chartjs-adapter-date-fns';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Arbitrage } from '../../../arbitrage/entity/arbitrage.entity';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

Chart.register(zoomPlugin);

@Component({
  selector: 'market-price-chart',
  standalone: true,
  imports: [AsyncPipe, NzSelectModule, FormsModule, NzSpaceModule, NzTimePickerModule],
  templateUrl: './price-chart.component.html',
  styleUrl: './price-chart.component.scss'
})
export class PriceChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('priceChartEl') priceChartEl!: ElementRef<HTMLCanvasElement>;
  private readonly currencySafeZoneApi = inject(CurrencySafeZoneApi);
  private readonly destroyRef = inject(DestroyRef);
  private readonly marketFacade = inject(MarketFacade);
  currencySafeZones$ = this.currencySafeZoneApi.currencySafeZones$;
  priceChart!: Chart;
  selectedCurrency = 'GMX';
  startTimeChart: Date = new Date(new Date().getTime() - 1000 * 60 * 3);
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
            unit: 'minute',
            displayFormats: {
              second: 'ss',
              minute: 'H:mm:ss',
              hour: 'HH:mm',
              day: 'MM dd',
              month: 'MM yy',
              year: 'yy'
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
          beginAtZero: false
        }
      },
      plugins: {
        zoom: {
          pan: {
            enabled: true,
            mode: 'xy',
            threshold: 10
          },
          zoom: {
            wheel: {
              enabled: true
            },
            pinch: {
              enabled: true
            },
            mode: 'xy',
            onZoom: ({chart}) => {
              const yScale = chart.scales['y'];
              const xScale = chart.scales['x'];

              const visibleData = chart.data.datasets.flatMap((dataset: ChartDataset<ChartType, any>) =>
                dataset.data.filter((point: { x: number; y: number }) =>
                  point.x >= xScale.min && point.x <= xScale.max
                )
              );

              if (visibleData.length) {
                yScale.options.min = Math.min(...visibleData.map((point: { x: number; y: number }) => point.y));
                yScale.options.max = Math.max(...visibleData.map((point: { x: number; y: number }) => point.y));
                chart.update('none');
              }
            }
          }
        }
      }
    }
  };

  onStartTimeChange(time: Date) {
    this.updateChart(this.selectedCurrency, time);
    this.startTimeChart = time;
    this.priceChart.update();
  }

  ngAfterViewInit() {
    this.createChart();
  }

  onCurrencyChange(currency: string) {
    this.updateChart(currency, this.startTimeChart);
    this.selectedCurrency = currency;
    this.priceChart.update();
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

  updateChart(currency: string, time: Date) {
    this.marketFacade.getMarketChartData$(currency, time).subscribe((data) => {
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

  ngOnDestroy() {
    if (this.priceChart) {
      this.priceChart.destroy();
    }
  }
}
