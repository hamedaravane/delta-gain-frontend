import {addCurrencyLogoUtil} from "../../market/util/add-currency-logo.util";

interface SortDto {
  direction: string;
  nullHandling: string;
  ascending: boolean;
  property: string;
  ignoreCase: boolean;
}

interface PageableDto {
  pageNumber: number;
  pageSize: number;
  offset: number;
  sort: SortDto[];
  paged: boolean;
  unpaged: boolean;
}

interface OrderDto {
  id: string;
  volume: number;
  spotAction: string;
  currency: string;
  amount: number;
  spotTarget: number;
  status: string;
  createdAt: string;
  placedAt: string | null;
  canceledAt: string | null;
  filledAt: string | null;
}

export interface ArbitrageDto {
  id: string;
  profit: number;
  profitUsdt: number;
  status: 'BUY_CANCELED' | 'SELL_CANCELED' | 'BUY_FILLED' | 'SELL_FILLED' | 'BUY_PLACED' | 'SELL_PLACED';
  createdAt: string;
  buyPlacedAt: string | null;
  buyFilledAt: string | null;
  buyCanceledAt: string | null;
  sellFilledAt: string | null;
  sellCanceledAt: string | null;
  currencyBase: string;
  buyTarget: number;
  buyVolume: number;
  buyTotalUsdt: number;
  sellTarget: number;
  sellVolume: number;
  buyOrder: OrderDto;
  sellOrder: OrderDto;
}

export interface ArbitrageResponseDto {
  totalPages: number;
  totalElements: number;
  pageable: PageableDto;
  size: number;
  content: ArbitrageDto[];
  number: number;
  sort: SortDto[];
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

interface Sort {
  direction: string;
  nullHandling: string;
  ascending: boolean;
  property: string;
  ignoreCase: boolean;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  offset: number;
  sort: Sort[];
  paged: boolean;
  unpaged: boolean;
}

interface Order {
  id: string;
  volume: number;
  spotAction: string;
  currency: string;
  amount: number;
  spotTarget: number;
  status: string;
  createdAt?: Date;
  placedAt?: Date;
  canceledAt?: Date;
  filledAt?: Date;
}

interface Status {
  status: 'FILLED' | 'CANCELED' | 'PLACED';
  side: 'BUY' | 'SELL';
}

function convertArbitrageStatusDtoToStatus(dto: 'BUY_PLACED' | 'BUY_CANCELED' | 'BUY_FILLED' | 'SELL_PLACED' | 'SELL_CANCELED' | 'SELL_FILLED'): Status {
  const split = dto.split('_');
  return {
    status: split[1] as 'FILLED' | 'CANCELED' | 'PLACED',
    side: split[0] as 'BUY' | 'SELL'
  }
}

export interface Arbitrage {
  id: string;
  profit: number;
  profitUsdt: number;
  status: Status;
  createdAt?: Date;
  buyPlacedAt?: Date;
  buyFilledAt?: Date;
  buyCanceledAt?: Date;
  sellFilledAt?: Date;
  sellCanceledAt?: Date;
  currencyBase: string;
  currencyBaseLogo?: string;
  buyTarget: number;
  buyVolume: number;
  buyTotalUsdt: number;
  sellTarget: number;
  sellVolume: number;
  buyOrder: Order;
  sellOrder: Order;
}

export interface ArbitrageResponse {
  totalPages: number;
  totalElements: number;
  pageable: Pageable;
  size: number;
  arbitrages: Arbitrage[];
  number: number;
  sort: Sort[];
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

function convertDate(dateString: string | null): Date | undefined {
  return dateString ? new Date(dateString) : undefined;
}

function convertOrderDtoToOrder(orderDto: OrderDto): Order {
  return {
    ...orderDto,
    createdAt: convertDate(orderDto.createdAt),
    placedAt: convertDate(orderDto.placedAt),
    canceledAt: convertDate(orderDto.canceledAt),
    filledAt: convertDate(orderDto.filledAt)
  };
}

function convertArbitrageDtoToArbitrage(arbitrageDto: ArbitrageDto): Arbitrage {
  return {
    ...arbitrageDto,
    status: convertArbitrageStatusDtoToStatus(arbitrageDto.status),
    currencyBaseLogo: addCurrencyLogoUtil(arbitrageDto.currencyBase),
    buyPlacedAt: convertDate(arbitrageDto.buyPlacedAt),
    createdAt: convertDate(arbitrageDto.createdAt),
    buyFilledAt: convertDate(arbitrageDto.buyFilledAt),
    buyCanceledAt: convertDate(arbitrageDto.buyCanceledAt),
    sellFilledAt: convertDate(arbitrageDto.sellFilledAt),
    sellCanceledAt: convertDate(arbitrageDto.sellCanceledAt),
    buyOrder: convertOrderDtoToOrder(arbitrageDto.buyOrder),
    sellOrder: convertOrderDtoToOrder(arbitrageDto.sellOrder)
  };
}

export function convertArbitrageResponseDtoToArbitrageResponse(paginationDto: ArbitrageResponseDto): ArbitrageResponse {
  return {
    ...paginationDto,
    arbitrages: paginationDto.content.map(convertArbitrageDtoToArbitrage)
  }
}
