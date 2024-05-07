import { inject, Injectable } from '@angular/core';
import { OmpfinexInfra } from 'src/app/market/infrastructure/ompfinex.infra';
import { bufferWhen, firstValueFrom, interval, map, Subject, switchMap, timer } from 'rxjs';
import {
  convertOmpfinexOrderBookWSDtoToDomain,
  getBestAsk,
  getBestBid,
  OmpfinexMarket,
  OmpfinexOrderBookWS,
  OmpfinexOrderBookWSDto,
  reduceOrdersToKLineData
} from 'src/app/market/entity/ompfinex.entity';
import { NzMessageService } from 'ng-zorro-antd/message';
import { getErrorMessage } from '@shared/entity/error.entity';
import { Centrifuge } from 'centrifuge';

@Injectable({providedIn: 'root'})
export class OmpfinexFacade {
  private readonly bufferTimeout = new Subject<number>();
  private readonly centrifugeClient = new Centrifuge('wss://stream.ompfinex.com/stream');
  private readonly infra = inject(OmpfinexInfra);
  private readonly nzMessageService = inject(NzMessageService);
  private readonly ompfinexMarketsLoadingSubject = new Subject<boolean>();
  private readonly ompfinexMarketsSubject = new Subject<OmpfinexMarket[]>();
  private readonly ompfinexOrderBookWSSubject = new Subject<OmpfinexOrderBookWS>();
  now = new Date();
  initialDelay = timer(1000 - (this.now.getMilliseconds())).pipe(
    switchMap(() => interval(1000)),
    map(() => new Date())
  );
  ompfinexMarkets$ = this.ompfinexMarketsSubject.asObservable();
  ompfinexMarketsLoading$ = this.ompfinexMarketsLoadingSubject.asObservable();

  get ompfinexKLineData$() {
    return this.ompfinexOrderBookWSSubject.asObservable().pipe(
      bufferWhen(() => this.initialDelay),
      map((orderBookWS) => reduceOrdersToKLineData(orderBookWS))
    );
  }

  createOrderBookSubscription(market: OmpfinexMarket) {
    const channelPrefix = 'public-market:real-orderbook-';
    const orderBookSub = this.centrifugeClient.newSubscription(channelPrefix + market.id);
    orderBookSub.on('subscribing', () => {
      this.nzMessageService.loading('subscribing to ' + market.baseCurrency.id);
    });
    orderBookSub.on('subscribed', () => {
      this.nzMessageService.success('subscribed to ' + market.baseCurrency.id);
    });
    orderBookSub.on('error', (ctx) => {
      this.nzMessageService.error(ctx.error.message);
    });
    orderBookSub.on('publication', (ctx) => {
      const rawData: OmpfinexOrderBookWSDto[] = ctx.data;
      const formattedData = rawData.map((raw) => convertOmpfinexOrderBookWSDtoToDomain(raw));
      const bestAsk = getBestAsk(formattedData);
      const bestBid = getBestBid(formattedData);
      this.ompfinexOrderBookWSSubject.next(bestAsk);
      this.ompfinexOrderBookWSSubject.next(bestBid);
    });
    orderBookSub.subscribe();
  }

  createWebsocketConnection() {
    this.centrifugeClient.on('connecting', () => {
      this.nzMessageService.loading('connecting to ompfinex websocket...');
    });
    this.centrifugeClient.on('connected', () => {
      this.nzMessageService.success('connected to ompfinex websocket');
    });
    this.centrifugeClient.on('error', (err) => {
      this.nzMessageService.error(err.error.message);
    });
    this.centrifugeClient.connect();
  }

  getUsdtMarkets() {
    this.ompfinexMarketsLoadingSubject.next(true);
    firstValueFrom(this.infra.getUsdtMarkets()).then((response) => {
      this.ompfinexMarketsSubject.next(response);
    }).catch((e) => {
      this.nzMessageService.error(getErrorMessage(e));
    }).finally(() => {
      this.ompfinexMarketsLoadingSubject.next(false);
    });
  }
}
