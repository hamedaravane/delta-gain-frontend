import {Routes} from "@angular/router";
import { resolve } from '@angular/compiler-cli';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout.component').then(c => c.LayoutComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('../orders/orders.component').then(c => c.OrdersComponent),
        data: {
          title: 'Orders'
        }
      },
      {
        path: 'market',
        loadComponent: () => import('../market/market.component').then(c => c.MarketComponent),
        data: {
          title: 'Market'
        }
      },
      {
        path: 'arbitrage',
        loadComponent: () => import('../arbitrage/component/arbitrage.component').then(c => c.ArbitrageComponent),
        data: {
          title: 'Arbitrage'
        }
      },
    ]
  }
];
