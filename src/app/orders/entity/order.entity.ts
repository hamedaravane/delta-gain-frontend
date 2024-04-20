export type ActionSide = 'sell' | 'buy';
export type ActionStatus = 'PENDING' | 'CANCELED' | 'PENDING_PLACEMENT' | 'FILLED';
interface SpotActionDTO {
  spot_action: ActionSide;
  currency: string;
  amount: number;
  fee: number;
  quote_amount_used: number;
  spot_target: number;
  created_at: string;
  filled_at: string;
  canceled_at: string;
  status: ActionStatus;
  placed_at: string;
  binance_price: number;
  omp_best_bid: number;
  omp_best_ask: number;
  maximum_profit_per_unit: number;
}

interface SpotAction {
  spotAction: ActionSide;
  currency: string;
  amount: number;
  fee: number;
  quoteAmountUsed: number;
  spotTarget: number;
  createdAt: Date;
  filledAt?: Date;
  canceledAt?: Date;
  status: ActionStatus;
  placedAt: Date;
  binancePrice?: number;
  ompBestBid?: number;
  ompBestAsk?: number;
  maximumProfitPerUnit: number;
}

export function convertSpotActionDtoToDomain(dto: SpotActionDTO): SpotAction {
  return {
    spotAction: dto.spot_action,
    currency: dto.currency,
    amount: dto.amount,
    fee: dto.fee,
    quoteAmountUsed: dto.quote_amount_used,
    spotTarget: dto.spot_target,
    createdAt: new Date(dto.created_at),
    filledAt: new Date(dto.filled_at),
    canceledAt: new Date(dto.canceled_at),
    status: dto.status,
    placedAt: new Date(dto.placed_at),
    binancePrice: dto.binance_price,
    ompBestBid: dto.omp_best_bid,
    ompBestAsk: dto.omp_best_ask,
    maximumProfitPerUnit: dto.maximum_profit_per_unit,
  }
}
