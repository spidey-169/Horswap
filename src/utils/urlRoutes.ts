export function getCurrentPageFromLocation(locationPathname: string) {
  switch (true) {
    case locationPathname.startsWith('/swap'):
      return 'SWAP_PAGE'
    case locationPathname.startsWith('/vote'):
      return 'VOTE_PAGE'
    case locationPathname.startsWith('/pools'):
    case locationPathname.startsWith('/pool'):
      return 'POOL_PAGE'
    case locationPathname.startsWith('/tokens'):
      return 'TOKENS_PAGE'
    case locationPathname.startsWith('/nfts/profile'):
      return 'NFT_PROFILE_PAGE'
    case locationPathname.startsWith('/nfts/asset'):
      return 'NFT_DETAILS_PAGE'
    case locationPathname.startsWith('/nfts/collection'):
      return 'NFT_COLLECTION_PAGE'
    case locationPathname.startsWith('/nfts'):
      return 'NFT_EXPLORE_PAGE'
    default:
      return undefined
  }
}
