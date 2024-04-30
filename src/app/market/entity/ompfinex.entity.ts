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