import { inject, Injectable } from '@angular/core';
import { CurrencySafeZoneFacade } from '../data-access/currency-safe-zone.facade';

@Injectable({providedIn: 'root'})
export class CurrencySafeZoneApi {
  private readonly currencySafeZoneFacade = inject(CurrencySafeZoneFacade);

  get currencySafeZones$() {
    return this.currencySafeZoneFacade.currencySafeZones$;
  }
}
