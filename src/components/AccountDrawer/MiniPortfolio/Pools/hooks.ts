import {
  ChainId,
  MULTICALL_ADDRESSES,
  NONFUNGIBLE_POSITION_MANAGER_ADDRESSES as V3NFT_ADDRESSES,
} from '@uniswap/sdk-core'
import type { AddressMap } from '@uniswap/smart-order-router'
import MulticallJSON from '@uniswap/v3-periphery/artifacts/contracts/lens/UniswapInterfaceMulticall.sol/UniswapInterfaceMulticall.json'
import { useWeb3React } from '@web3-react/core'
import { isSupportedChain } from 'constants/chains'
import { RPC_PROVIDERS } from 'constants/providers'
import { BaseContract } from 'ethers/lib/ethers'
import { useMemo } from 'react'
import { UniswapInterfaceMulticall } from 'types/v3'
import { getContract } from 'utils'

type ContractMap<T extends BaseContract> = { [key: number]: T }

// Constructs a chain-to-contract map, using the wallet's provider when available
function useContractMultichain<T extends BaseContract>(
  addressMap: AddressMap,
  ABI: any,
  chainIds?: ChainId[]
): ContractMap<T> {
  const { chainId: walletChainId, provider: walletProvider } = useWeb3React()

  const networkProviders = RPC_PROVIDERS

  return useMemo(() => {
    const relevantChains =
      chainIds ??
      Object.keys(addressMap)
        .map((chainId) => parseInt(chainId))
        .filter((chainId) => isSupportedChain(chainId))

    return relevantChains.reduce((acc: ContractMap<T>, chainId) => {
      const provider =
        walletProvider && walletChainId === chainId
          ? walletProvider
          : isSupportedChain(chainId)
          ? networkProviders[chainId]
          : undefined
      if (provider) {
        acc[chainId] = getContract(addressMap[chainId] ?? '', ABI, provider) as T
      }
      return acc
    }, {})
  }, [ABI, addressMap, chainIds, networkProviders, walletChainId, walletProvider])
}

export function useInterfaceMulticallContracts(chainIds: ChainId[]): ContractMap<UniswapInterfaceMulticall> {
  return useContractMultichain<UniswapInterfaceMulticall>(MULTICALL_ADDRESSES, MulticallJSON.abi, chainIds)
}
