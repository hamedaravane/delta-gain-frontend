import {inject, Injectable} from '@angular/core';
import {ArbitrageInfra} from '../infrastructure/arbitrage.infra';
import {firstValueFrom, map, Subject} from 'rxjs';
import {ArbitrageResponse} from '../entity/arbitrage.entity';
import {NzMessageService} from 'ng-zorro-antd/message';

@Injectable({providedIn: 'root'})
export class ArbitrageFacade {
  private readonly nzMessageService = inject(NzMessageService);
  private readonly arbitrageInfra = inject(ArbitrageInfra);
  private readonly arbitragesSubject = new Subject<ArbitrageResponse>();
  private readonly isArbitragesLoadingSubject = new Subject<boolean>();
  isArbitragesLoading$ = this.isArbitragesLoadingSubject.asObservable();
  arbitrages$ = this.arbitragesSubject.asObservable().pipe(map(value => value.embedded.arbitrages));
  arbitragesPages$ = this.arbitragesSubject.asObservable().pipe(map(value => value.page));

  async loadArbitrages(page: number = 0, size: number = 20) {
    this.isArbitragesLoadingSubject.next(true);
    try {
      const response = await firstValueFrom(this.arbitrageInfra.getArbitrages(page, size));
      this.arbitragesSubject.next(response);
    } catch (e) {
      this.nzMessageService.error('Error while fetching arbitrages');
    } finally {
      this.isArbitragesLoadingSubject.next(false);
    }
  }

  async reloadArbitrages(page: number = 0, size: number = 20, interval: number) {
    setInterval(() => {
      this.loadArbitrages(page, size);
    }, interval);
  }
}
