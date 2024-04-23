import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import { WebsocketClient, WsFormattedMessage } from "binance";
import {WsMessageKlineFormatted} from "binance/lib/types/websockets";
import { KLineData } from 'klinecharts';

@Injectable({providedIn: 'root'})
export class BinanceFacade {
  private client!: WebsocketClient;
  private chartDataSubject = new Subject<KLineData>();
  binanceChartData$ = this.chartDataSubject.asObservable();

  createConnection() {
    this.client = new WebsocketClient({beautify: true});
    this.handleMessages();
  }

  private handleMessages() {
    this.client.on('formattedMessage', (data) => {
      if (!Array.isArray(data) && data.eventType === 'kline') {
        const kLineData: KLineData = {...data.kline, timestamp: data.eventTime};
        this.chartDataSubject.next(kLineData);
      }
    });
  }

  subscription(symbol: string) {
    this.client.subscribeSpotKline(symbol, '1s', true);
  }

  unsubscribe() {
    this.client.closeAll();
  }
}
