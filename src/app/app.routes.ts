import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'app'
  },
  {
    path: 'app',
    loadChildren: () => import('./layout/layout.routes').then(r => r.routes)
  }
];
