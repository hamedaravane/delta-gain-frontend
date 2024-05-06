import { Big } from 'big.js';
import { KLineData } from 'klinecharts';

export interface OmpfinexApiResponse<T> {
  status: 'OK',
  data: T;
}
export interface OmpfinexMarketDto {
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

export interface OmpfinexMarket {
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

export function convertOmpfinexMarketsDtoToDomain(dto: OmpfinexMarketDto): OmpfinexMarket {
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

export interface OmpfinexMarketWSDto {
  price: string;
  v: string;
  t: number;
  m: number;
}

export interface OmpfinexOrderBookWSDto {
  p: string;
  a: string;
  t: 'sell' | 'buy';
}

export interface OmpfinexKLineData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
  turnover?: number;
}

export interface OmpfinexOrderBookWS {
  price: number;
  volume: number;
  side: 'sell' | 'buy';
  timestamp: number;
}

export function convertOmpfinexOrderBookWSDtoToDomain(dto: OmpfinexOrderBookWSDto): OmpfinexOrderBookWS {
  return {
    price: Big(dto.p).toNumber(),
    volume: Big(dto.a).toNumber(),
    side: dto.t,
    timestamp: new Date().getTime()
  }
}

export function getBestBid(orders: OmpfinexOrderBookWS[]) {
  if (!Array.isArray(orders)) {
    throw new Error('order book is empty');
  }
  let bestBid = { price: -1 } as OmpfinexOrderBookWS;
  for (const order of orders) {
    if (order.side === 'buy') {
      if (Big(order.price).gt(bestBid.price)) {
        bestBid = {...order};
      }
    }
  }
  if (bestBid.price === -1) {
    throw new Error('best bid or ask is not found');
  }
  return bestBid;
}

export function getBestAsk(orders: OmpfinexOrderBookWS[]) {
  if (!Array.isArray(orders)) {
    throw new Error('order book is empty');
  }
  let bestAsk = { price: Infinity } as OmpfinexOrderBookWS;
  for (const order of orders) {
    if (order.side === 'sell') {
      if (Big(order.price).lt(bestAsk.price)) {
        bestAsk = {...order};
      }
    }
  }
  if (bestAsk.price === Infinity) {
    throw new Error('best bid or ask is not found');
  }
  return bestAsk;
}

export function reduceOrdersToKLineData(orderBookWS: OmpfinexOrderBookWS[]): KLineData {
  const acc: KLineData = {
    timestamp: 0,
    open: 0,
    high: 0,
    low: 0,
    close: 0,
    volume: 0,
  };
  return orderBookWS.reduce((acc, curr, index) => {
    if (index === 0) {
      acc.timestamp = curr.timestamp;
      acc.open = curr.price;
      acc.high = curr.price;
      acc.low = curr.price;
      acc.close = curr.price;
      acc.volume = curr.volume;
    } else {
      acc.high = Big(acc.high).cmp(curr.price) === 1 ? curr.price : acc.high;
      acc.low = Big(acc.low).cmp(curr.price) < 1 ? curr.price : acc.low;
      acc.close = curr.price;
      acc.volume! += curr.volume;
    }
    return acc;
  }, acc);
}