import { SearchToken } from 'graphql/data/SearchTokens'

/**
 * Organizes the number of Token and NFT results to be shown to a user depending on if they're in the NFT or Token experience
 * If not an nft page show up to 5 tokens, else up to 3. Max total suggestions of 8
 * @param isNFTPage boolean if user is currently on an nft page
 * @param tokenResults array of FungibleToken results
 * @param collectionResults array of NFT Collection results
 * @returns an array of Fungible Tokens and an array of NFT Collections with correct number of results to be shown
 */
export function organizeSearchResults(tokenResults: SearchToken[]): [SearchToken[]] {
  const reducedTokens = tokenResults?.slice(0, 5) ?? []
  return [reducedTokens]
}
