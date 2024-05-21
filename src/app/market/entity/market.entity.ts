interface SortCriteriaDto {
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
  sort: SortCriteriaDto;
  paged: boolean;
  unpaged: boolean;
}

export interface ContentItemDto {
  id: string;
  currencyBase: string;
  currencyQuote: string;
  bestAskBase: number;
  bestBidBase: number;
  bestAskBaseVol: number;
  bestBidBaseVol: number;
  bestAskVuln: number;
  bestBidVuln: number;
  bestAskVulnVol: number;
  bestBidVulnVol: number;
  buyProfit: number;
  buySellProfit: number;
  createdAt: string;
  createdAtCycle: string;
}

export interface PaginationResponseDto {
  totalPages: number;
  totalElements: number;
  pageable: PageableDto;
  size: number;
  content: ContentItemDto[];
  number: number;
  sort: SortCriteriaDto;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

interface SortCriteria {
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
  sort: SortCriteria;
  paged: boolean;
  unpaged: boolean;
}

export interface ContentItem {
  id: string;
  currencyBase: string;
  currencyQuote: string;
  bestAskBase: number;
  bestBidBase: number;
  bestAskBaseVol: number;
  bestBidBaseVol: number;
  bestAskVuln: number;
  bestBidVuln: number;
  bestAskVulnVol: number;
  bestBidVulnVol: number;
  buyProfit: number;
  buySellProfit: number;
  createdAt: Date;
  createdAtCycle: string;
}

export interface PaginationResponse {
  totalPages: number;
  totalElements: number;
  pageable: Pageable;
  size: number;
  content: ContentItem[];
  number: number;
  sort: SortCriteria;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

function convertSortCriteriaDtoToDomain(sortDto: SortCriteriaDto): SortCriteria {
  return { ...sortDto };
}

function convertPageableDtoToDomain(pageableDto: PageableDto): Pageable {
  return {
    ...pageableDto,
    sort: convertSortCriteriaDtoToDomain(pageableDto.sort)
  };
}

function convertContentItemDtoToDomain(contentItemDto: ContentItemDto): ContentItem {
  return {
    ...contentItemDto,
    createdAt: new Date(contentItemDto.createdAt)
  };
}

export function convertPaginationResponseDtoToDomain(responseDto: PaginationResponseDto): PaginationResponse {
  return {
    ...responseDto,
    pageable: convertPageableDtoToDomain(responseDto.pageable),
    content: responseDto.content.map(convertContentItemDtoToDomain),
    sort: convertSortCriteriaDtoToDomain(responseDto.sort)
  };
}
