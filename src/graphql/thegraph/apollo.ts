import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { ChainId } from '@uniswap/sdk-core'

const CHAIN_SUBGRAPH_URL: Record<number, string> = {
  [ChainId.MAINNET]: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3?source=uniswap',
  [ChainId.ARBITRUM_ONE]: 'https://thegraph.com/hosted-service/subgraph/ianlapham/uniswap-arbitrum-one?source=uniswap',
  [ChainId.OPTIMISM]: 'https://api.thegraph.com/subgraphs/name/ianlapham/optimism-post-regenesis?source=uniswap',
  [ChainId.POLYGON]: 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-polygon?source=uniswap',
  [ChainId.CELO]: 'https://api.thegraph.com/subgraphs/name/jesse-sawa/uniswap-celo?source=uniswap',
  [ChainId.BNB]: 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-bsc?source=uniswap',
  [ChainId.AVALANCHE]: 'https://api.thegraph.com/subgraphs/name/lynnshaoyu/uniswap-v3-avax?source=uniswap',
  [ChainId.BASE]: 'https://api.studio.thegraph.com/query/48211/uniswap-v3-base/version/latest',
}

const CHAIN_BLOCK_SUBGRAPH_URL: Record<number, string> = {
  [ChainId.MAINNET]: 'https://api.thegraph.com/subgraphs/name/blocklytics/ethereum-blocks?source=uniswap',
  [ChainId.ARBITRUM_ONE]: 'https://api.thegraph.com/subgraphs/name/ianlapham/arbitrum-one-blocks?source=uniswap',
  [ChainId.OPTIMISM]: 'https://api.thegraph.com/subgraphs/name/ianlapham/uni-testing-subgraph?source=uniswap',
  [ChainId.POLYGON]: 'https://api.thegraph.com/subgraphs/name/ianlapham/polygon-blocks?source=uniswap',
  [ChainId.CELO]: 'https://api.thegraph.com/subgraphs/name/jesse-sawa/celo-blocks?source=uniswap',
  [ChainId.BNB]: 'https://api.thegraph.com/subgraphs/name/wombat-exchange/bnb-chain-block?source=uniswap',
  [ChainId.AVALANCHE]: 'https://api.thegraph.com/subgraphs/name/lynnshaoyu/avalanche-blocks?source=uniswap',
  [ChainId.BASE]: 'https://api.studio.thegraph.com/query/48211/base-blocks/version/latest?source=uniswap',
}

export const chainToApolloClient: Record<number, ApolloClient<NormalizedCacheObject>> = {
  [ChainId.MAINNET]: new ApolloClient({
    cache: new InMemoryCache(),
    uri: CHAIN_SUBGRAPH_URL[ChainId.MAINNET],
  }),
  [ChainId.ARBITRUM_ONE]: new ApolloClient({
    cache: new InMemoryCache(),
    uri: CHAIN_SUBGRAPH_URL[ChainId.ARBITRUM_ONE],
  }),
  [ChainId.OPTIMISM]: new ApolloClient({
    cache: new InMemoryCache(),
    uri: CHAIN_SUBGRAPH_URL[ChainId.OPTIMISM],
  }),
  [ChainId.POLYGON]: new ApolloClient({
    cache: new InMemoryCache(),
    uri: CHAIN_SUBGRAPH_URL[ChainId.POLYGON],
  }),
  [ChainId.CELO]: new ApolloClient({
    cache: new InMemoryCache(),
    uri: CHAIN_SUBGRAPH_URL[ChainId.CELO],
  }),
  [ChainId.BNB]: new ApolloClient({
    cache: new InMemoryCache(),
    uri: CHAIN_SUBGRAPH_URL[ChainId.BNB],
  }),
  [ChainId.AVALANCHE]: new ApolloClient({
    cache: new InMemoryCache(),
    uri: CHAIN_SUBGRAPH_URL[ChainId.AVALANCHE],
  }),
}

export const chainToApolloBlockClient: Record<number, ApolloClient<NormalizedCacheObject>> = {
  [ChainId.MAINNET]: new ApolloClient({
    uri: CHAIN_BLOCK_SUBGRAPH_URL[ChainId.MAINNET],
    cache: new InMemoryCache(),
  }),
  [ChainId.ARBITRUM_ONE]: new ApolloClient({
    uri: CHAIN_BLOCK_SUBGRAPH_URL[ChainId.ARBITRUM_ONE],
    cache: new InMemoryCache(),
  }),
  [ChainId.OPTIMISM]: new ApolloClient({
    uri: CHAIN_BLOCK_SUBGRAPH_URL[ChainId.OPTIMISM],
    cache: new InMemoryCache(),
  }),
  [ChainId.POLYGON]: new ApolloClient({
    uri: CHAIN_BLOCK_SUBGRAPH_URL[ChainId.POLYGON],
    cache: new InMemoryCache(),
  }),
  [ChainId.CELO]: new ApolloClient({
    uri: CHAIN_BLOCK_SUBGRAPH_URL[ChainId.CELO],
    cache: new InMemoryCache(),
  }),
  [ChainId.BNB]: new ApolloClient({
    uri: CHAIN_BLOCK_SUBGRAPH_URL[ChainId.BNB],
    cache: new InMemoryCache(),
  }),
  [ChainId.AVALANCHE]: new ApolloClient({
    uri: CHAIN_BLOCK_SUBGRAPH_URL[ChainId.AVALANCHE],
    cache: new InMemoryCache(),
  }),
}
