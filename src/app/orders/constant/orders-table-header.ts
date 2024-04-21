import { ActionSide, SpotAction } from '@orders/entity/order.entity';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';

interface ColumnItem {
  fieldId: number;
  fieldName: string;
  isActive: boolean;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<SpotAction> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<SpotAction> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}

export const headers: ColumnItem[] = [
  {
    fieldId: 1,
    fieldName: 'order side',
    isActive: true,
    sortOrder: null,
    sortFn: (a: SpotAction, b: SpotAction, sortOrder) => a.spotAction.localeCompare(b.spotAction),
    sortDirections: ['ascend', 'descend', null],
    filterMultiple: true,
    listOfFilter: [{text: 'buy', value: 'buy'}, {text: 'sell', value: 'sell'}],
    filterFn: (value: ActionSide[], data) => value.includes(data.spotAction)
  },
  {
    fieldId: 2,
    fieldName: 'currency',
    isActive: true,
    sortFn: (a: SpotAction, b: SpotAction, sortOrder) => a.currency.localeCompare(b.currency),
    sortDirections: ['ascend', 'descend', null],
    filterMultiple: true,
    sortOrder: null,
    listOfFilter: [],
    filterFn: null
  },
  {
    fieldId: 3,
    fieldName: 'volume',
    isActive: true,
    sortFn: (a: SpotAction, b: SpotAction, sortOrder) => a.amount - b.amount,
    sortDirections: ['ascend', 'descend', null],
    filterMultiple: true,
    sortOrder: null,
    listOfFilter: [],
    filterFn: null
  },
  {
    fieldId: 4,
    fieldName: 'fee',
    isActive: true,
    sortFn: (a: SpotAction, b: SpotAction, sortOrder) => a.fee - b.fee,
    sortDirections: ['ascend', 'descend', null],
    filterMultiple: true,
    sortOrder: null,
    listOfFilter: [],
    filterFn: null
  },
  {
    fieldId: 5,
    fieldName: 'quote volume',
    isActive: true,
    sortFn: (a: SpotAction, b: SpotAction, sortOrder) => a.quoteAmountUsed - b.quoteAmountUsed,
    sortDirections: ['ascend', 'descend', null],
    filterMultiple: true,
    sortOrder: null,
    listOfFilter: [],
    filterFn: null
  },
  {
    fieldId: 6,
    fieldName: 'spot target',
    isActive: true,
    sortFn: (a: SpotAction, b: SpotAction, sortOrder) => a.spotTarget - b.spotTarget,
    sortDirections: ['ascend', 'descend', null],
    filterMultiple: true,
    sortOrder: null,
    listOfFilter: [],
    filterFn: null
  },
  {
    fieldId: 7,
    fieldName: 'created at',
    isActive: true,
    sortDirections: ['ascend', 'descend', null],
    filterMultiple: true,
    sortOrder: null,
    sortFn: null,
    listOfFilter: [],
    filterFn: null
  },
  {
    fieldId: 8,
    fieldName: 'filled at',
    isActive: true,
    sortDirections: ['ascend', 'descend', null],
    filterMultiple: true,
    sortOrder: null,
    sortFn: null,
    listOfFilter: [],
    filterFn: null
  },
  {
    fieldId: 9,
    fieldName: 'canceled at',
    isActive: true,
    sortDirections: ['ascend', 'descend', null],
    filterMultiple: true,
    sortOrder: null,
    sortFn: null,
    listOfFilter: [],
    filterFn: null
  },
  {
    fieldId: 10,
    fieldName: 'status',
    isActive: true,
    sortFn: (a: SpotAction, b: SpotAction, sortOrder) => a.status.localeCompare(b.status),
    sortDirections: ['ascend', 'descend', null],
    filterMultiple: true,
    sortOrder: null,
    listOfFilter: [],
    filterFn: null
  },
  {
    fieldId: 11,
    fieldName: 'placed at',
    isActive: true,
    sortDirections: ['ascend', 'descend', null],
    filterMultiple: true,
    sortOrder: null,
    sortFn: null,
    listOfFilter: [],
    filterFn: null
  },
  {
    fieldId: 12,
    fieldName: 'binance price',
    isActive: true,
    sortDirections: ['ascend', 'descend', null],
    filterMultiple: true,
    sortOrder: null,
    sortFn: null,
    listOfFilter: [],
    filterFn: null
  },
  {
    fieldId: 13,
    fieldName: 'omp best bid',
    isActive: true,
    sortDirections: ['ascend', 'descend', null],
    filterMultiple: true,
    sortOrder: null,
    sortFn: null,
    listOfFilter: [],
    filterFn: null
  },
  {
    fieldId: 14,
    fieldName: 'omp best ask',
    isActive: true,
    sortDirections: ['ascend', 'descend', null],
    filterMultiple: true,
    sortOrder: null,
    sortFn: null,
    listOfFilter: [],
    filterFn: null
  },
  {
    fieldId: 15,
    fieldName: 'maximum profit',
    isActive: true,
    sortFn: (a: SpotAction, b: SpotAction, sortOrder) => a.maximumProfitPerUnit - b.maximumProfitPerUnit,
    sortDirections: ['ascend', 'descend', null],
    filterMultiple: true,
    sortOrder: null,
    listOfFilter: [],
    filterFn: null
  }
];
