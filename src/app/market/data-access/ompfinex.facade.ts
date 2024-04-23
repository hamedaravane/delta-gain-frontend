import { inject, Injectable } from '@angular/core';
import { OmpfinexInfra } from 'src/app/market/infrastructure/ompfinex.infra';
import { firstValueFrom, Subject, Subscription } from 'rxjs';
import { OmpfinexMarkets } from 'src/app/market/entity/ompfinex.entity';

@Injectable({providedIn: 'root'})
export class OmpfinexFacade {
  private readonly infra = inject(OmpfinexInfra);
  ompfinexMarketsSubject = new Subject<OmpfinexMarkets[]>();

  constructor() {
    this.getUsdtMarkets();
  }

  getUsdtMarkets() {
    firstValueFrom(this.infra.getUsdtMarkets()).then((response) => {
      this.ompfinexMarketsSubject.next(response);
    }).catch((e) => console.error(e));
  }
}
