import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  convertOmpfinexMarketsDtoToDomain,
  convertOmpfinexOrderDtoToDomain,
  OmpfinexApiResponse,
  OmpfinexMarketsDto,
  OmpfinexOrdersApiResponse,
  OrderDto
} from 'src/app/market/entity/ompfinex.entity';
import {map, Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class OmpfinexInfra {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = 'https://api.ompfinex.com/'

  getUsdtMarkets() {
    return this.httpClient.get<OmpfinexApiResponse<OmpfinexMarketsDto[]>>(this.baseUrl + 'v1/market').pipe(
      map((data) => {
        return data.data.map((market) => {
          return convertOmpfinexMarketsDtoToDomain(market);
        }).filter((predicate) => predicate.quoteCurrency.id === 'USDT')
      })
    )
  }

  /**
   * Retrieves a paginated list of raw orders with optional filters for market ID and order status.
   *
   * @param {number} pageIndex - The page index for pagination.
   * @param {string} [marketId] - Optional. The identifier for the market to filter orders by.
   * @param {string} [status] - Optional. The status of the orders to retrieve (e.g., 'open', 'closed').
   * @returns {Observable<OmpfinexOrdersApiResponse<OrderDto[]>>} A promise that resolves to an API response object containing an array of order data.
   */
  getRawOrders(pageIndex: number, marketId?: string, status?: string): Observable<OmpfinexOrdersApiResponse<OrderDto[]>> {
    const marketIdQueryParam = marketId ? `&market_id=${marketId}` : '';
    const statusQueryParam = status ? `&status=${status}` : '';
    return this.httpClient.get<OmpfinexOrdersApiResponse<OrderDto[]>>(this.baseUrl + '/v2/user/order?limit=100&page=' + pageIndex + marketIdQueryParam + statusQueryParam);
  }

  // todo: fix return type
  getLatestOrders(latestOrderId: number) {
    return this.httpClient.get<OmpfinexOrdersApiResponse<OrderDto[]>>(this.baseUrl + '/v2/user/order?limit=10&page=1').pipe(
      map((data) => {
        let orderLimit = false;
        return data.data
          .map((order) => {
            if (order.id === latestOrderId) {
              orderLimit = true
            }
            if (!orderLimit) {
              return convertOmpfinexOrderDtoToDomain(order);
            }
            return undefined;
          })
          .filter(Boolean);
      })
    );
  }
}
