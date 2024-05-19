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
import { Chart, ChartConfiguration, ChartData } from 'chart.js';
import { MarketFacade } from '../../data-access/market.facade';
import { Observable } from 'rxjs';
import { ContentItem } from '../../entity/market.entity';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { COLORS } from '@shared/constant/tailwind-colors';

@Component({
  selector: 'market-price-chart',
  standalone: true,
  imports: [],
  templateUrl: './price-chart.component.html',
  styleUrl: './price-chart.component.scss'
})
export class PriceChartComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly destroyRef = inject(DestroyRef);
  private readonly marketFacade = inject(MarketFacade);
  private priceChart!: Chart;
  @ViewChild('priceChart') private priceChartEl!: ElementRef<HTMLCanvasElement>;

  chartData: ChartData = {
    datasets: [
      {
        label: 'Binance Ask',
        data: [],
        borderColor: COLORS.orange_5,
        fill: false,
        pointRadius: 0
      },
      {
        label: 'Binance Bid',
        data: [],
        borderColor: COLORS.amber_5,
        fill: false,
        pointRadius: 0
      },
      {
        label: 'OMP Ask',
        data: [],
        borderColor: COLORS.teal_6,
        fill: false,
        pointRadius: 0
      },
      {
        label: 'OMP Bid',
        data: [],
        borderColor: COLORS.emerald_5,
        fill: false,
        pointRadius: 0
      },
      {
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
      }
    ],
    labels: []
  };
  private chartConfiguration: ChartConfiguration = {
    type: 'line',
    data: this.chartData
  };
  marketContent$: Observable<ContentItem[]> = this.marketFacade.marketContent$;

  ngOnInit() {
    this.marketContent$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(content => {
      for (const contentItem of content) {
        this.chartData.datasets[0].data.push(contentItem.bestAskBase);
        this.chartData.datasets[1].data.push(contentItem.bestBidBase);
        this.chartData.datasets[2].data.push(contentItem.bestAskVuln);
        this.chartData.datasets[3].data.push(contentItem.bestBidVuln);
        this.chartData.labels?.push(contentItem.createdAt);
      }
    });
  }

  ngAfterViewInit() {
    this.priceChart = new Chart(this.priceChartEl.nativeElement, this.chartConfiguration);
    this.priceChart.draw();
  }

  ngOnDestroy() {
    this.priceChart.destroy();
  }
}
