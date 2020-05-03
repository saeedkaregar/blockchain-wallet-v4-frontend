import { lift } from 'ramda'

import { selectors } from 'data'

export const getData = state => {
  const btcRateR = selectors.core.data.btc.getRates(state)
  const coin = selectors.components.interest.getCoinType(state)
  const accountBalancesR = selectors.components.interest.getInterestAccountBalance(
    state
  )
  const supportedCoinsR = selectors.core.walletOptions.getSupportedCoins(state)
  const walletCurrencyR = selectors.core.settings.getCurrency(state)

  return lift((accountBalances, rates, supportedCoins, walletCurrency) => ({
    accountBalances,
    coin,
    rates,
    supportedCoins,
    walletCurrency
  }))(accountBalancesR, btcRateR, supportedCoinsR, walletCurrencyR)
}
