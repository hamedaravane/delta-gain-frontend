import { ChartConfiguration, ChartData, ChartDataset, ChartType } from 'chart.js/auto';
import { COLORS, transparent } from '@shared/constant/tailwind-colors';

export const chartData: ChartData = {
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

export function generateChartConfiguration(data: ChartData): ChartConfiguration {
  return {
    type: 'line',
    data,
    options: {
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
                yScale.options.min = Math.min(...visibleData.map((point: {
                  x: number;
                  y: number
                }) => point.y));
                yScale.options.max = Math.max(...visibleData.map((point: {
                  x: number;
                  y: number
                }) => point.y));
                chart.update('none');
              }
            }
          }
        }
      }
    }
  };
}