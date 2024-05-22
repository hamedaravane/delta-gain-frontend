import {inject, Injectable} from "@angular/core";
import {ArbitrageFacade} from "../data-access/arbitrage.facade";

@Injectable({providedIn: 'root'})
export class ArbitrageApi {
  private readonly arbitrageFacade = inject(ArbitrageFacade);

  get arbitrages$() {
    return this.arbitrageFacade.arbitrages$;
  }
}
