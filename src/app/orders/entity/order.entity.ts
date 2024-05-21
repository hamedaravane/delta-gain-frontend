import { addCurrencyLogoUtil } from '../../market/util/add-currency-logo.util';
import {
  convertLinksDtoToDomain,
  Links,
  LinksDto
} from '@shared/entity/common.entity';

interface OrderDto {
  spotAction: string;
  currency: string;
  amount: number;
  fee: number;
  quoteAmountUsed: number;
  spotTarget: number;
  providerOrderId: string;
  status: 'CANCELED' | 'FILLED' | 'PENDING_PLACEMENT' | 'PLACED';
  createdAt: string;
  canceledAt?: string;
  filledAt?: string;
  placedAt?: string;
  _links: LinksDto;
}

interface EmbeddedOrdersDto {
  orders: OrderDto[];
}

interface PageDto {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

export interface OrderResponseDto {
  _embedded: EmbeddedOrdersDto;
  _links: LinksDto;
  page: PageDto;
}

export interface Order {
  spotAction: string;
  currency: string;
  currencyLogo?: string;
  amount: number;
  fee: number;
  quoteAmountUsed: number;
  spotTarget: number;
  providerOrderId: string;
  status: 'CANCELED' | 'FILLED' | 'PENDING_PLACEMENT' | 'PLACED';
  createdAt: Date;
  canceledAt?: Date;
  filledAt?: Date;
  placedAt?: Date;
  links: Links;
}

interface EmbeddedOrders {
  orders: Order[];
}

interface Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

export interface OrderResponse {
  embedded: EmbeddedOrders;
  links: Links;
  page: Page;
}

function convertOrderDtoToDomain(orderDto: OrderDto): Order {
  return {
    spotAction: orderDto.spotAction,
    currency: orderDto.currency,
    currencyLogo: addCurrencyLogoUtil(orderDto.currency),
    amount: orderDto.amount,
    fee: orderDto.fee,
    quoteAmountUsed: orderDto.quoteAmountUsed,
    spotTarget: orderDto.spotTarget,
    providerOrderId: orderDto.providerOrderId,
    status: orderDto.status,
    createdAt: new Date(orderDto.createdAt),
    canceledAt: orderDto.canceledAt ? new Date(orderDto.canceledAt) : undefined,
    filledAt: orderDto.filledAt ? new Date(orderDto.filledAt) : undefined,
    placedAt: orderDto.placedAt ? new Date(orderDto.placedAt) : undefined,
    links: convertLinksDtoToDomain(orderDto._links),
  };
}

function convertEmbeddedOrdersDtoToDomain(embeddedDto: EmbeddedOrdersDto): EmbeddedOrders {
  return {
    orders: embeddedDto.orders.map(convertOrderDtoToDomain),
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

export function convertOrderResponseDtoToDomain(responseDto: OrderResponseDto): OrderResponse {
  return {
    embedded: convertEmbeddedOrdersDtoToDomain(responseDto._embedded),
    links: convertLinksDtoToDomain(responseDto._links),
    page: convertPageDtoToDomain(responseDto.page),
  };
}
