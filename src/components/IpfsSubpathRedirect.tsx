import { CID } from 'multiformats'
import { useEffect } from 'react'

export const IpfsSubpathRedirect = () => {
  useEffect(() => {
    const hashFromBase = extractIpfsHashFromBasePath()

    if (!hashFromBase) return

    const redirectUrl = generateIpfsSubdomainUrl(hashFromBase)

    // redirect to IPFS subdomain url
    window.location.href = redirectUrl
  }, [])

  return null
}

function extractIpfsHashFromBasePath() {
  const htmlBase = document.querySelector('base')
  if (!htmlBase) return
  const cidRegex =
    /\/ipfs\/(Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,})/
  return htmlBase.href.match(cidRegex)?.at(1)
}

function generateIpfsSubdomainUrl(cidHash: string) {
  const cidV1String = CID.parse(cidHash).toV1().toString()
  const host = window.location.hostname === '127.0.0.1' ? `localhost:${location.port}` : location.host
  return `${location.protocol}//${cidV1String}.ipfs.${host}`
}
