export type OrderType = 'sell' | 'buy';
export type ActionStatusDto = 'PENDING' | 'CANCELED' | 'PENDING_PLACEMENT' | 'FILLED';
export type ActionStatus = 'PENDING' | 'CANCELED' | 'PLACING' | 'FILLED';
export type OrderStatus = 'COMPLETED' | 'PENDING' | 'CANCELING';
export type OrderExecution = 'MARKET' | 'LIMIT';
export interface SpotActionDTO {
  spot_action: OrderType;
  currency: string;
  amount: number;
  fee: number;
  quote_amount_used: number;
  spot_target: number;
  created_at: string;
  filled_at: string;
  canceled_at: string;
  status: ActionStatusDto;
  placed_at: string;
  binance_price: number;
  omp_best_bid: number;
  omp_best_ask: number;
  maximum_profit_per_unit: number;
}

export interface SpotAction {
  spotAction: OrderType;
  currency: string;
  amount: number;
  fee: number;
  quoteAmountUsed: number;
  spotTarget: number;
  createdAt: Date;
  filledAt?: Date;
  canceledAt?: Date;
  status: ActionStatus;
  placedAt: Date;
  binancePrice?: number;
  ompBestBid?: number;
  ompBestAsk?: number;
  maximumProfitPerUnit: number;
}

export function convertSpotActionDtoToDomain(dto: SpotActionDTO[]): SpotAction[] {
  return dto.map((action) => {
    return {
      spotAction: action.spot_action,
      currency: action.currency,
      amount: action.amount,
      fee: action.fee,
      quoteAmountUsed: action.quote_amount_used,
      spotTarget: action.spot_target,
      createdAt: new Date(action.created_at),
      filledAt: new Date(action.filled_at),
      canceledAt: new Date(action.canceled_at),
      status: action.status === 'PENDING_PLACEMENT' ? 'PLACING' : action.status,
      placedAt: new Date(action.placed_at),
      binancePrice: action.binance_price,
      ompBestBid: action.omp_best_bid,
      ompBestAsk: action.omp_best_ask,
      maximumProfitPerUnit: action.maximum_profit_per_unit,
    } as SpotAction;
  })
}


export interface CurrencyDto {
  id: string;
  decimal_precision: number;
  name: string;
}

export interface Currency {
  id: string;
  decimalPrecision: number;
  name: string;
}

export interface MarketDto {
  id: number;
  name: string;
  quote_currency: CurrencyDto;
  base_currency: CurrencyDto;
  base_currency_precision: number;
  quote_currency_precision: number;
}

export interface Market {
  id: number;
  name: string;
  symbol: string;
  quoteCurrency: Currency;
  baseCurrency: Currency;
  baseCurrencyPrecision: number;
  quoteCurrencyPrecision: number;
}

export interface OrderDto {
  id: number;
  type: string;
  market: MarketDto;
  amount: string;
  completed_amount: string;
  price: string;
  fee: string;
  status: OrderStatus;
  execution: OrderExecution;
  created_at: string;
}

export interface Order {
  id: number;
  type: string;
  market: Market;
  amount: string;
  completedAmount: string;
  price: string;
  fee: string;
  status: OrderStatus;
  execution: OrderExecution;
  createdAt: Date;
}

export interface OmpfinexOrdersApiResponse<T> {
  status: 'OK';
  data: T;
  total_records: number;
  per_page: number;
  page: number;
  total_pages: number;
}

export function convertOmpfinexOrderDtoToDomain(dto: OrderDto): Order {
  return {
    id: dto.id,
    type: dto.type,
    market: {
      id: dto.market.id,
      baseCurrencyPrecision: dto.market.base_currency_precision,
      quoteCurrencyPrecision: dto.market.quote_currency_precision,
      name: dto.market.name,
      symbol: dto.market.base_currency.id + dto.market.quote_currency.id,
      baseCurrency: {
        id: dto.market.base_currency.id,
        decimalPrecision: dto.market.base_currency.decimal_precision,
        name: dto.market.base_currency.name
      },
      quoteCurrency: {
        id: dto.market.quote_currency.id,
        decimalPrecision: dto.market.quote_currency.decimal_precision,
        name: dto.market.quote_currency.name
      }
    },
    amount: dto.amount,
    completedAmount: dto.completed_amount,
    price: dto.price,
    fee: dto.fee,
    status: dto.status,
    execution: dto.execution,
    createdAt: new Date(dto.created_at)
  }
}

/*export function extractTradeFromOrder(data: Order) {
  return {
    id: crypto.randomUUID(),
    market: data.market,

  }
}*/
