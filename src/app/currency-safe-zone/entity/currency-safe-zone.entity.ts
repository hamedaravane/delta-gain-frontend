import {
  Links,
  LinksDto,
  convertLinksDtoToDomain
} from '@shared/entity/common.entity';

interface CurrencySfzDto {
  currency: string;
  sfzRate: number;
  investmentUsdt: number;
  _links: LinksDto;
}

interface EmbeddedCurrencySfzesDto {
  currencySfzes: CurrencySfzDto[];
}

interface PageDto {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

export interface CurrencySfzResponseDto {
  _embedded: EmbeddedCurrencySfzesDto;
  _links: LinksDto;
  page: PageDto;
}

export interface CurrencySfz {
  currency: string;
  sfzRate: number;
  investmentUsdt: number;
  links: Links;
}

interface EmbeddedCurrencySfzes {
  currencySfzes: CurrencySfz[];
}

interface Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

export interface CurrencySfzResponse {
  embedded: EmbeddedCurrencySfzes;
  links: Links;
  page: Page;
}

function convertCurrencySfzDtoToDomain(currencySfzDto: CurrencySfzDto): CurrencySfz {
  return {
    currency: currencySfzDto.currency,
    sfzRate: currencySfzDto.sfzRate,
    investmentUsdt: currencySfzDto.investmentUsdt,
    links: convertLinksDtoToDomain(currencySfzDto._links)
  };
}

function convertEmbeddedCurrencySfzesDtoToDomain(embeddedDto: EmbeddedCurrencySfzesDto): EmbeddedCurrencySfzes {
  return {
    currencySfzes: embeddedDto.currencySfzes.map(convertCurrencySfzDtoToDomain)
  };
}

function convertPageDtoToDomain(pageDto: PageDto): Page {
  return {
    size: pageDto.size,
    totalElements: pageDto.totalElements,
    totalPages: pageDto.totalPages,
    number: pageDto.number,
  };
}

export function convertCurrencySfzResponseDtoToDomain(responseDto: CurrencySfzResponseDto): CurrencySfzResponse {
  return {
    embedded: convertEmbeddedCurrencySfzesDtoToDomain(responseDto._embedded),
    links: convertLinksDtoToDomain(responseDto._links),
    page: convertPageDtoToDomain(responseDto.page)
  };
}
