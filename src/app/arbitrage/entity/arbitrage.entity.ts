export interface LinkPropertyDto {
  href: string;
  hreflang?: string;
  title?: string;
  type?: string;
  deprecation?: string;
  profile?: string;
  name?: string;
  templated?: boolean;
}

export interface LinksDto {
  [key: string]: LinkPropertyDto;
}

export interface ArbitrageDto {
  buyOrderId: string;
  sellOrderId: string;
  profit: number;
  profitUsdt: number;
  leftOverBase: number | null;
  createdAtCycle: string;
  status: 'BUY_CANCELED' | 'SELL_CANCELED' | 'BUY_FILLED' | 'SELL_FILLED';
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

export interface LinkProperty {
  href: string;
  hreflang?: string;
  title?: string;
  type?: string;
  deprecation?: string;
  profile?: string;
  name?: string;
  templated?: boolean;
}

export interface Links {
  [key: string]: LinkProperty;
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
  buyPlacedAt: Date | null;
  sellPlacedAt: Date | null;
  buyFilledAt: Date | null;
  buyCanceledAt: Date | null;
  sellFilledAt: Date | null;
  sellCanceledAt: Date | null;
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

export function convertLinkProperty(dto: LinkPropertyDto): LinkProperty {
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

export function convertLinks(dto: LinksDto): Links {
  const links: Links = {};
  for (const key in dto) {
    links[key] = convertLinkProperty(dto[key]);
  }
  return links;
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
    buyPlacedAt: dto.buyPlacedAt ? new Date(dto.buyPlacedAt) : null,
    sellPlacedAt: dto.sellPlacedAt ? new Date(dto.sellPlacedAt) : null,
    buyFilledAt: dto.buyFilledAt ? new Date(dto.buyFilledAt) : null,
    buyCanceledAt: dto.buyCanceledAt ? new Date(dto.buyCanceledAt) : null,
    sellFilledAt: dto.sellFilledAt ? new Date(dto.sellFilledAt) : null,
    sellCanceledAt: dto.sellCanceledAt ? new Date(dto.sellCanceledAt) : null,
    currencyBase: dto.currencyBase,
    buyTarget: dto.buyTarget,
    buyVolume: dto.buyVolume,
    buyTotalUsdt: dto.buyTotalUsdt,
    sellTarget: dto.sellTarget,
    sellVolume: dto.sellVolume,
    links: convertLinks(dto._links),
  };
}

export interface Status {
  side: 'BUY' | 'SELL';
  status: 'FILLED' | 'CANCELED',
  rowColor: string;
}

export function convertStatus(status: 'BUY_CANCELED' | 'SELL_CANCELED' | 'BUY_FILLED' | 'SELL_FILLED'): Status {
  switch (status) {
    case 'BUY_CANCELED':
      return {
        side: 'BUY',
        status: 'CANCELED',
        rowColor: 'rose-700',
      }
    case 'SELL_CANCELED':
      return {
        side: 'SELL',
        status: 'CANCELED',
        rowColor: 'rose-700',
      }
    case 'BUY_FILLED':
      return {
        side: 'BUY',
        status: 'FILLED',
        rowColor: 'teal-700',
      }
    case 'SELL_FILLED':
      return {
        side: 'SELL',
        status: 'FILLED',
        rowColor: 'teal-700',
      }
  }
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
    links: convertLinks(dto._links),
    page: convertPage(dto.page),
  };
}
