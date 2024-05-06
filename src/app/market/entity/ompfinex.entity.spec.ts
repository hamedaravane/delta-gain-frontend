import { OmpfinexOrderBookWSDto, getBestBidAndAsk } from './ompfinex.entity';

const orderBook: OmpfinexOrderBookWSDto[] = [
  { t: 'buy', p: '1.23', a: '1.0' },
  { t: 'buy', p: '1.22', a: '2.0' },
  { t: 'sell', p: '1.25', a: '1.5' },
  { t: 'sell', p: '1.26', a: '0.5' },
];

describe('extractBestBidAndAsk', () => {
  it('should extract the best bid and ask from the order book', () => {
    const { bestBid, bestAsk } = getBestBidAndAsk(orderBook);

    expect(bestBid).toEqual({ t: 'buy', p: '1.22', a: '2.0' });
    expect(bestAsk).toEqual({ t: 'sell', p: '1.25', a: '1.5' });
  });

  it('should handle an empty order book', () => {
    const emptyOrderBook: OmpfinexOrderBookWSDto[] = [];
    const { bestBid, bestAsk } = getBestBidAndAsk(emptyOrderBook);

    expect(bestBid).toBeUndefined();
    expect(bestAsk).toBeUndefined();
  });
});
