import {inject, Injectable} from '@angular/core';
import {ArbitrageInfra} from '../infrastructure/arbitrage.infra';
import {firstValueFrom, interval, map, Subject, Subscription} from 'rxjs';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ArbitrageResponse} from "../entity/arbitrage.entity";

@Injectable({providedIn: 'root'})
export class ArbitrageFacade {
  reloadDataSubscription = new Subscription();
  isLoaded = false;
  private readonly arbitrageInfra = inject(ArbitrageInfra);
  private readonly arbitragesSubject = new Subject<ArbitrageResponse>();
  arbitragesPages$ = this.arbitragesSubject.asObservable().pipe(map(value => value.totalPages));
  private readonly isArbitragesLoadingSubject = new Subject<boolean>();
  isArbitragesLoading$ = this.isArbitragesLoadingSubject.asObservable();
  private readonly nzMessageService = inject(NzMessageService);

  get arbitrages$() {
    if (!this.isLoaded) {
      this.loadArbitrages().then();
    }
    return this.arbitragesSubject.asObservable().pipe(map(value => value.arbitrages));
  }

  async loadArbitrages(page: number = 0, size: number = 20) {
    this.isArbitragesLoadingSubject.next(true);
    try {
      this.isLoaded = true;
      const response = await firstValueFrom(this.arbitrageInfra.getArbitrage(page, size));
      this.arbitragesSubject.next(response);
    } catch (e) {
      this.nzMessageService.error('Error while fetching arbitrages');
    } finally {
      this.isArbitragesLoadingSubject.next(false);
    }
  }

  reloadArbitrages(page: number, size: number, _interval: number) {
    this.reloadDataSubscription = interval(_interval).subscribe(() => {
      firstValueFrom(this.arbitrageInfra.getArbitrage(page, size)).then(response => {
        this.arbitragesSubject.next(response);
      }).catch(() => {
        this.nzMessageService.error('Error while fetching arbitrages');
      });
    });
  }
}
