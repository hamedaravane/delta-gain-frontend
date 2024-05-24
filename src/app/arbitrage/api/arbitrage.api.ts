import {inject, Injectable} from "@angular/core";
import {ArbitrageFacade} from "../data-access/arbitrage.facade";
import {Filter, Operator} from '@shared/entity/common.entity';
import {ArbitrageDto} from '../entity/arbitrage.entity';

@Injectable({providedIn: 'root'})
export class ArbitrageApi {
  private readonly arbitrageFacade = inject(ArbitrageFacade);

  getArbitrages(page: number = 0, size: number = 20, filters?: Filter<ArbitrageDto, Operator, string>[]) {
    this.arbitrageFacade.loadArbitrages(page, size, filters).then();
    return this.arbitrageFacade.arbitrages$;
  }
}
