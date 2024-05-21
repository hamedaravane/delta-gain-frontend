import { inject, Injectable } from '@angular/core';
import { CurrencySafeZoneInfra } from '../infrastructure/currency-safe-zone.infra';
import { firstValueFrom, Observable, Subject } from 'rxjs';
import { CurrencySfz } from '../entity/currency-safe-zone.entity';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({providedIn: 'root'})
export class CurrencySafeZoneFacade {
  private readonly currencySafeZoneInfra = inject(CurrencySafeZoneInfra);
  private readonly currencySafeZones = new Subject<CurrencySfz[]>();
  private readonly isCurrencySafeZoneLoading = new Subject<boolean>();
  private isLoaded = false;
  private readonly nzMessageService = inject(NzMessageService);

  get currencySafeZones$(): Observable<CurrencySfz[]> {
    if (!this.isLoaded) {
      this.loadCurrencySafeZone().then();
    }
    return this.currencySafeZones.asObservable();
  }

  async loadCurrencySafeZone() {
    this.isCurrencySafeZoneLoading.next(true);
    try {
      const response = await firstValueFrom(this.currencySafeZoneInfra.getCurrencySafeZones());
      this.currencySafeZones.next(response.embedded.currencySfzes);
      this.isLoaded = true;
    } catch (e) {
      this.nzMessageService.error('Error while loading currency safe zones');
    } finally {
      this.isCurrencySafeZoneLoading.next(false);
    }
  }
}
