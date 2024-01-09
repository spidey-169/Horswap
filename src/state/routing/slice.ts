import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Protocol } from '@uniswap/router-sdk'
import ms from 'ms'

import { GetQuoteArgs, QuoteMethod, QuoteState, TradeResult } from './types'
import { transformRoutesToTrade } from './utils'

const CLIENT_PARAMS = {
  protocols: [Protocol.V2, Protocol.V3, Protocol.MIXED],
}

function getQuoteLatencyMeasure(mark: PerformanceMark): PerformanceMeasure {
  performance.mark('quote-fetch-end')
  return performance.measure('quote-fetch-latency', mark.name, 'quote-fetch-end')
}

export const routingApi = createApi({
  reducerPath: 'routingApi',
  baseQuery: fetchBaseQuery({}),
  endpoints: (build) => ({
    getQuote: build.query<TradeResult, GetQuoteArgs>({
      async onQueryStarted(_args: GetQuoteArgs, { queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error: unknown) {
          if (!(error && typeof error === 'object' && 'error' in error)) {
            throw error
          }
        }
      },
      async queryFn(args) {
        const quoteStartMark = performance.mark(`quote-fetch-start-${Date.now()}`)
        try {
          const { getRouter, getClientSideQuote } = await import('lib/hooks/routing/clientSideSmartOrderRouter')
          const router = getRouter(args.tokenInChainId)
          const quoteResult = await getClientSideQuote(args, router, CLIENT_PARAMS)
          if (quoteResult.state === QuoteState.SUCCESS) {
            const trade = await transformRoutesToTrade(args, quoteResult.data, QuoteMethod.CLIENT_SIDE)
            return {
              data: { ...trade, latencyMs: getQuoteLatencyMeasure(quoteStartMark).duration },
            }
          } else {
            return { data: { ...quoteResult, latencyMs: getQuoteLatencyMeasure(quoteStartMark).duration } }
          }
        } catch (error: any) {
          console.warn(`GetQuote failed on client: ${error}`)
          return {
            error: { status: 'CUSTOM_ERROR', error: error?.detail ?? error?.message ?? error },
          }
        }
      },
      keepUnusedDataFor: ms(`10s`),
      extraOptions: {
        maxRetries: 0,
      },
    }),
  }),
})

export const { useGetQuoteQuery } = routingApi
export const useGetQuoteQueryState = routingApi.endpoints.getQuote.useQueryState
