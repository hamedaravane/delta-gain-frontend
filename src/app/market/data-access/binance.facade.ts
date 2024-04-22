import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {WebsocketClient} from "binance";
import {WsMessageKlineFormatted} from "binance/lib/types/websockets";

@Injectable({providedIn: 'root'})
export class BinanceFacade {
  private client!: WebsocketClient;
  private chartDataSubject = new Subject<WsMessageKlineFormatted>();
  binanceChartData$ = this.chartDataSubject.asObservable();

  createConnection() {
    this.client = new WebsocketClient({beautify: true});
    this.handleMessages();
  }

  private handleMessages(): void {
    this.client.on('formattedMessage', (data) => {
      this.chartDataSubject.next(data as WsMessageKlineFormatted);
    });
  }

  subscription(symbol: string): void {
    this.client.subscribeKlines(symbol, '1s', "spot", true);
  }
}
