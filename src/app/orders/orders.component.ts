import { Component } from '@angular/core';
import { NzTableComponent } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    NzTableComponent
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  headers = [
    {fieldId: 0, fieldName: 'id', isActive: true},
    {fieldId: 1, fieldName: 'spot_action', isActive: true},
    {fieldId: 2, fieldName: 'currency', isActive: true},
    {fieldId: 3, fieldName: 'amount', isActive: true},
    {fieldId: 4, fieldName: 'fee', isActive: true},
    {fieldId: 5, fieldName: 'quote_amount_used', isActive: true},
    {fieldId: 6, fieldName: 'spot_target', isActive: true},
    {fieldId: 7, fieldName: 'created_at', isActive: true},
    {fieldId: 8, fieldName: 'filled_at', isActive: true},
    {fieldId: 9, fieldName: 'canceled_at', isActive: true},
    {fieldId: 10, fieldName: 'status', isActive: true},
    {fieldId: 11, fieldName: 'placed_at', isActive: true},
    {fieldId: 12, fieldName: 'binance_price', isActive: true},
    {fieldId: 13, fieldName: 'omp_best_bid', isActive: true},
    {fieldId: 14, fieldName: 'omp_best_ask', isActive: true},
    {fieldId: 15, fieldName: 'maximum_profit_per_unit', isActive: true},
  ];
}
