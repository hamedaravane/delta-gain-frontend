export interface OmpfinexApiResponse<T> {
  status: 'OK',
  data: T;
}
export interface OmpfinexMarketsDto {
  id: number,
  base_currency: {
    id: string;
    icon_path: string;
    name: string;
  },
  quote_currency: {
    id: string;
    icon_path: string;
    name: string;
  },
  name: string;
  min_price: number;
  max_price: number;
  last_price: number;
  day_change_percent: number;
  tradingview_symbol: string;
  liked_by_user: boolean;
}

export interface OmpfinexMarkets {
  id: number,
  baseCurrency: {
    id: string;
    iconPath: string;
    name: string;
  },
  quoteCurrency: {
    id: string;
    iconPath: string;
    name: string;
  },
  symbol: string;
  name: string;
  minPrice: number;
  maxPrice: number;
  lastPrice: number;
  dayChangePercent: number;
  likedByUser: boolean;
}

export function convertOmpfinexMarketsDtoToDomain(dto: OmpfinexMarketsDto): OmpfinexMarkets {
  return {
    id: dto.id,
    baseCurrency: {
      id: dto.base_currency.id,
      iconPath: dto.base_currency.icon_path,
      name: dto.base_currency.name
    },
    quoteCurrency: {
      id: dto.quote_currency.id,
      iconPath: dto.quote_currency.icon_path,
      name: dto.quote_currency.name
    },
    symbol: `${dto.base_currency.id}${dto.quote_currency.id}`,
    name: dto.name,
    minPrice: dto.min_price,
    maxPrice: dto.max_price,
    lastPrice: dto.last_price,
    dayChangePercent: dto.day_change_percent,
    likedByUser: dto.liked_by_user
  }
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
  status: string;
  execution: string;
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
  status: string;
  execution: string;
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
