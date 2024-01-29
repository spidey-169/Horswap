import { CID } from 'multiformats'
import { useEffect } from 'react'

export const IpfsSubpathRedirect = () => {
  useEffect(() => {
    const hashFromBase = extractIpfsHashFromBasePath()

    if (!hashFromBase) {
      console.info('Base ref does not contain an IPFS hash')
      return
    }

    const redirectUrl = generateIpfsSubdomainUrl(hashFromBase)
    if (!redirectUrl) return

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
  return `${location.protocol}//${cidV1String}.ipfs.${location.host}`
}
