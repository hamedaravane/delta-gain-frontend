import {coinmarketcapMapId} from '../constant/coinmarketcap.constant';

export function addCurrencyLogoUtil(currencyId: string): string {
  const currency = coinmarketcapMapId.find((item) => item.symbol === currencyId);
  if (currency) {
    return `https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`
  } else return '';
}
