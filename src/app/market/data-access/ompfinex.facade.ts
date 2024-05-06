import { inject, Injectable } from '@angular/core';
import { OmpfinexInfra } from 'src/app/market/infrastructure/ompfinex.infra';
import { bufferWhen, firstValueFrom, map, Subject } from 'rxjs';
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
  private ompfinexBestBuyAndAskSubject = new Subject<OmpfinexOrderBookWS>();
  private ompfinexMarketsLoadingSubject = new Subject<boolean>();
  ompfinexMarketsLoading$ = this.ompfinexMarketsLoadingSubject.asObservable();
  ompfinexMarketsSubject = new Subject<OmpfinexMarket[]>();

  get ompfinexKLineData$() {
    return this.ompfinexBestBuyAndAskSubject.asObservable().pipe(
      bufferWhen(() => this.bufferTimeout),
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
      let publicationTime = new Date().getTime();
      const rawData: OmpfinexOrderBookWSDto[] = ctx.data;
      const formattedData = rawData.map((raw) => convertOmpfinexOrderBookWSDtoToDomain(raw));
      const bestAsk = getBestAsk(formattedData);
      const bestBid = getBestBid(formattedData);
      if (new Date().getTime() - publicationTime > 1000) {
        this.bufferTimeout.next(publicationTime);
      }
      this.ompfinexBestBuyAndAskSubject.next(bestAsk);
      this.ompfinexBestBuyAndAskSubject.next(bestBid);
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
    this.centrifugeClient.on('error', () => {
      this.nzMessageService.error('error connecting to ompfinex websocket');
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
