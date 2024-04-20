export type ActionSide = 'sell' | 'buy';
export type ActionStatus = 'PENDING' | 'CANCELED' | 'PENDING_PLACEMENT' | 'FILLED';
export interface SpotActionDTO {
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

export interface SpotAction {
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

export function convertSpotActionDtoToDomain(dto: SpotActionDTO[]): SpotAction[] {
  return dto.map((action) => {
    return {
      spotAction: action.spot_action,
      currency: action.currency,
      amount: action.amount,
      fee: action.fee,
      quoteAmountUsed: action.quote_amount_used,
      spotTarget: action.spot_target,
      createdAt: new Date(action.created_at),
      filledAt: new Date(action.filled_at),
      canceledAt: new Date(action.canceled_at),
      status: action.status,
      placedAt: new Date(action.placed_at),
      binancePrice: action.binance_price,
      ompBestBid: action.omp_best_bid,
      ompBestAsk: action.omp_best_ask,
      maximumProfitPerUnit: action.maximum_profit_per_unit,
    } as SpotAction;
  })
}
