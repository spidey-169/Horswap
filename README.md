# Horswap

An open source interface for Uniswap -- a protocol for decentralized exchange of Ethereum tokens.

<img src="screenshot.png" style="width: 500px" />

Horswap is accessible via IPFS at:
ipfs://bafybeifldxm7db2slsnyvu4lruzh5zbuq2jmqzwztmeq7efs6kes7helim

# Horswap is an improved Uniswap Interface
Horswap is a fork of Uniswap Interface v4.266.2. The version v4.266.2 is the last version without added UI fees and that would still allow users to do local routing. Horswap has then significantly improved the interface's censorship resistance and privacy.

Here are the significant changes:
- Changed Uniswap branding to Horswap branding
- Removed Uniswap privacy policy
- Removed all analytics queries (Uniswap interface is really noisy in reporting everything you do to their analytics system)
- Removed support for wallet connect wallets (Unfortunately these require centralized server to function)
- Changed socials to point to dark.florist equivalents
- Removed copyright notices for Uniswap
- Removed blacklisted tokens and user addresses
- Replaced the default RPC (Infura, which censors) with Keydonix (does not censor)
- Removed Moonpay (a centralized fiat payment processsor)
- Removed NFT related features (unfortunately these only function by using centralized services)
- Remove Subgraph (unfortunately this is also a centralized service)
- Remove pages that require subgraph (mini portfolio, portfolio, NFTs, token pages, pool details, search bar etc)
- Fiat currency selector has been removed (requires subgraph)
- Remove external routing, all routing is done using the default RPC or users wallet RPC
- Removed UniswapX (UniswapX depends on centralized servers)
- Settings have been moved to where the mini portfolio used to be
- Changed token pricing to be from a simulated swap with USDC, and it is shown to users that this is in USDC (not in dollars)
- Removed claim UNI tokens popup
- Added docker building and deployment to IPFS

# Socials
- Website: [dark.florist](https://www.dark.florist/)
- Uniswap Docs: [uniswap.org/docs/](https://docs.uniswap.org/)
- Twitter: [@DarkFlorist](https://twitter.com/DarkFlorist)
- Discord: [Dark Florists](https://discord.com/invite/aCSKcvf5VW)
- Uniswap Whitepapers:
  - V1 ipfs://bafybeihyq5jjttgmfdsonnbv73cshadkd3c3m3dptcrhqjeds6xij6rlim/ [dweb](https://bafybeihyq5jjttgmfdsonnbv73cshadkd3c3m3dptcrhqjeds6xij6rlim.ipfs.dweb.link/)
  - V2 ipfs://bafybeia5cxs72meianwphz2aq2tv5irpdgmkfniqsuhznl66s677zakgce/ [dweb](https://bafybeia5cxs72meianwphz2aq2tv5irpdgmkfniqsuhznl66s677zakgce.ipfs.dweb.link/)
  - V3 ipfs://bafybeifgsqhf44fqxz4fnhomgwxy3666vrat2zu4djs5rgvjopatcfe42y/ [dweb](https://bafybeifgsqhf44fqxz4fnhomgwxy3666vrat2zu4djs5rgvjopatcfe42y.ipfs.dweb.link/)
