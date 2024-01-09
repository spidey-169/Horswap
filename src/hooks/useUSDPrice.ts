import { Currency, CurrencyAmount } from '@uniswap/sdk-core'
import { useMemo } from 'react'

import useStablecoinPrice from './useStablecoinPrice'

export function useUSDPrice(
  currencyAmount?: CurrencyAmount<Currency>,
  prefetchCurrency?: Currency
): {
  data?: number
  isLoading: boolean
} {
  const currency = currencyAmount?.currency ?? prefetchCurrency

  // Use USDC-based pricing for chains.
  const stablecoinPrice = useStablecoinPrice(currency)

  return useMemo(() => {
    if (currencyAmount && stablecoinPrice) {
      return { data: parseFloat(stablecoinPrice.quote(currencyAmount).toSignificant()), isLoading: false }
    } else {
      return { data: undefined, isLoading: false }
    }
  }, [currencyAmount, stablecoinPrice])
}
