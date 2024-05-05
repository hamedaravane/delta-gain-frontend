import { inject, Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import {
  convertOmpfinexOrderDtoToDomain,
  OmpfinexOrdersApiResponse,
  OrderDto,
  Order,
  SpotActionDTO,
  SpotAction, convertSpotActionDtoToDomain, OrderStatus
} from '@orders/entity/order.entity';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class OrdersInfra {
  protected readonly httpClient = inject(HttpClient);
  private readonly baseUrl = 'https://api.ompfinex.com'

  /**
   * Retrieves a paginated list of raw orders with optional filters for market ID and order status.
   *
   * @param {number} pageIndex - The page index for pagination.
   * @param {string} [marketId] - Optional. The identifier for the market to filter orders by.
   * @param {string} [status] - Optional. The status of the orders to retrieve (e.g., 'open', 'closed').
   * @returns {Observable<OmpfinexOrdersApiResponse<OrderDto[]>>} A promise that resolves to an API response object containing an array of order data.
   */
  getRawOrders(pageIndex: number, status: OrderStatus, marketId?: string): Observable<OmpfinexOrdersApiResponse<OrderDto[]>> {
    const marketIdQueryParam = marketId ? `&market_id=${marketId}` : '';
    return this.httpClient.get<OmpfinexOrdersApiResponse<OrderDto[]>>(this.baseUrl + `/v2/user/order?limit=100&status=${status}&page=` + pageIndex + marketIdQueryParam);
  }

  /**
   * Fetches the latest orders up to a specified order ID and converts them to the domain model.
   * This method retrieves a predefined number of orders (currently set to 10) and stops processing
   * once it finds the specified `latestOrderId`, meaning it only includes orders newer than
   * `latestOrderId`. This is useful for scenarios where only new orders since the last checked
   * order ID need to be fetched and processed.
   *
   * @param {number} latestOrderId - The order ID up to which orders should be fetched. This ID
   *                                 acts as a marker indicating up to which order the data is
   *                                 already processed or known, so only newer orders are considered.
   * @returns {Observable<Order[]>} An Observable that, when subscribed to, will emit an array
   *                                of Orders transformed from the raw Order DTOs fetched from
   *                                the API. The Observable will complete after emitting this array.
   *
   * @example
   * const latestOrderId = 1023;
   * firstValueFrom(getLatestOrders(latestOrderId)).then((orders) => {
   *   console.log(orders);
   * })
   */
  getLatestOrders(latestOrderId: number): Observable<Order[]> {
    return this.httpClient.get<OrderDto[]>(this.baseUrl + '/v2/user/order?limit=10&page=1').pipe(
      map((response) => {
        const orders: Order[] = [];
        for (const orderDto of response) {
          if (orderDto.id === latestOrderId) {
            break;
          }
          orders.push(convertOmpfinexOrderDtoToDomain(orderDto));
        }
        return orders;
      })
    );
  }

  getOrders(): Observable<SpotAction[]> {
    return this.httpClient.get<SpotActionDTO[]>('http://localhost:3000/api/orders')
      .pipe(map(orders => convertSpotActionDtoToDomain(orders)))
  }
}
