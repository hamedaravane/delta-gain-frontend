import {Routes} from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout.component').then(c => c.LayoutComponent),
    children: [
      {
        path: 'arbitrage',
        loadComponent: () => import('../arbitrage/component/arbitrage.component').then(c => c.ArbitrageComponent),
        data: {
          title: 'Arbitrage'
        }
      },
      {
        path: 'orders',
        loadComponent: () => import('../orders/component/orders.component').then(c => c.OrdersComponent),
        data: {
          title: 'Orders'
        }
      },
      {
        path: 'chart',
        loadComponent: () => import('../market/component/price-chart/price-chart.component').then(c => c.PriceChartComponent),
        data: {
          title: 'Chart'
        }
      },
    ]
  }
];
