import {Routes} from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout.component').then(c => c.LayoutComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('../orders/orders.component').then(c => c.OrdersComponent)
      },
      {
        path: 'market',
        loadComponent: () => import('../market/market.component').then(c => c.MarketComponent)
      }
    ]
  }
];
