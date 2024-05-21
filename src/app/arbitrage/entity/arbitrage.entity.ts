import { addCurrencyLogoUtil } from '../../market/util/add-currency-logo.util';
import {
  LinkDto,
  Links,
  Link,
  LinksDto,
  convertLinksDtoToDomain
} from '@shared/entity/common.entity';

export interface ArbitrageDto {
  buyOrderId: string;
  sellOrderId: string;
  profit: number;
  profitUsdt: number;
  leftOverBase: number | null;
  createdAtCycle: string;
  status: 'BUY_CANCELED' | 'SELL_CANCELED' | 'BUY_FILLED' | 'SELL_FILLED' | 'BUY_PLACED' | 'SELL_PLACED';
  createdAt: string;
  buyPlacedAt: string;
  sellPlacedAt: string | null;
  buyFilledAt: string | null;
  buyCanceledAt: string | null;
  sellFilledAt: string | null;
  sellCanceledAt: string | null;
  currencyBase: string;
  buyTarget: number;
  buyVolume: number;
  buyTotalUsdt: number;
  sellTarget: number;
  sellVolume: number | null;
  _links: LinksDto;
}

export interface EmbeddedArbitragesDto {
  arbitrages: ArbitrageDto[];
}

export interface PageDto {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

export interface ArbitrageResponseDto {
  _embedded: EmbeddedArbitragesDto;
  _links: LinksDto;
  page: PageDto;
}

export interface Arbitrage {
  buyOrderId: string;
  sellOrderId: string;
  profit: number;
  profitUsdt: number;
  leftOverBase: number | null;
  createdAtCycle: string;
  status: Status;
  createdAt: Date;
  buyPlacedAt?: Date;
  sellPlacedAt?: Date;
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
  sellVolume: number | null;
  links: Links;
  [key: string]: any;
}

export interface EmbeddedArbitrages {
  arbitrages: Arbitrage[];
}

export interface Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

export interface ArbitrageResponse {
  embedded: EmbeddedArbitrages;
  links: Links;
  page: Page;
}

export function convertLinkProperty(dto: LinkDto): Link {
  return {
    href: dto.href,
    hreflang: dto.hreflang,
    title: dto.title,
    type: dto.type,
    deprecation: dto.deprecation,
    profile: dto.profile,
    name: dto.name,
    templated: dto.templated,
  };
}

export function convertArbitrage(dto: ArbitrageDto): Arbitrage {
  return {
    buyOrderId: dto.buyOrderId,
    sellOrderId: dto.sellOrderId,
    profit: dto.profit,
    profitUsdt: dto.profitUsdt,
    leftOverBase: dto.leftOverBase,
    createdAtCycle: dto.createdAtCycle,
    status: convertStatus(dto.status),
    createdAt: new Date(dto.createdAt),
    buyPlacedAt: dto.buyPlacedAt ? new Date(dto.buyPlacedAt) : undefined,
    sellPlacedAt: dto.sellPlacedAt ? new Date(dto.sellPlacedAt) : undefined,
    buyFilledAt: dto.buyFilledAt ? new Date(dto.buyFilledAt) : undefined,
    buyCanceledAt: dto.buyCanceledAt ? new Date(dto.buyCanceledAt) : undefined,
    sellFilledAt: dto.sellFilledAt ? new Date(dto.sellFilledAt) : undefined,
    sellCanceledAt: dto.sellCanceledAt ? new Date(dto.sellCanceledAt) : undefined,
    currencyBase: dto.currencyBase,
    currencyBaseLogo: addCurrencyLogoUtil(dto.currencyBase),
    buyTarget: dto.buyTarget,
    buyVolume: dto.buyVolume,
    buyTotalUsdt: dto.buyTotalUsdt,
    sellTarget: dto.sellTarget,
    sellVolume: dto.sellVolume,
    links: convertLinksDtoToDomain(dto._links),
  };
}

export interface Status {
  side: 'BUY' | 'SELL';
  status: 'FILLED' | 'CANCELED' | 'PLACED';
}

export function convertStatus(status: 'BUY_CANCELED' | 'SELL_CANCELED' | 'BUY_FILLED' | 'SELL_FILLED' | 'BUY_PLACED' | 'SELL_PLACED'): Status {
  const split = status.split('_');
  return {
    side: split[0] as 'BUY' | 'SELL',
    status: split[1] as 'FILLED' | 'CANCELED' | 'PLACED',
  };
}

export function convertEmbeddedArbitrages(dto: EmbeddedArbitragesDto): EmbeddedArbitrages {
  return {
    arbitrages: dto.arbitrages.map(convertArbitrage),
  };
}

export function convertPage(dto: PageDto): Page {
  return {
    size: dto.size,
    totalElements: dto.totalElements,
    totalPages: dto.totalPages,
    number: dto.number,
  };
}

export function convertArbitrageResponse(dto: ArbitrageResponseDto): ArbitrageResponse {
  return {
    embedded: convertEmbeddedArbitrages(dto._embedded),
    links: convertLinksDtoToDomain(dto._links),
    page: convertPage(dto.page),
  };
}
