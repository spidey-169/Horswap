export function isDevelopmentEnv(): boolean {
  return process.env.NODE_ENV === 'development'
}

export function isTestEnv(): boolean {
  return process.env.NODE_ENV === 'test'
}

export function isStagingEnv(): boolean {
  // This is set in vercel builds and deploys from releases/staging.
  return Boolean(process.env.REACT_APP_STAGING)
}

export function isProductionEnv(): boolean {
  return process.env.NODE_ENV === 'production' && !isStagingEnv()
}

export function isAppUniswapOrg({ hostname }: { hostname: string }): boolean {
  return hostname === 'app.uniswap.org'
}

export function isAppUniswapStagingOrg({ hostname }: { hostname: string }): boolean {
  return hostname === 'app.corn-staging.com'
}

export function isBrowserRouterEnabled(): boolean {
  if (isProductionEnv()) {
    if (
      isAppUniswapOrg(window.location) ||
      isAppUniswapStagingOrg(window.location) ||
      isLocalhost(window.location) // cypress tests
    ) {
      return true
    }
    return false // production builds *not* served through our domains or localhost, eg IPFS
  }
  return true // local dev builds
}

function isLocalhost({ hostname }: { hostname: string }): boolean {
  return hostname === 'localhost'
}
