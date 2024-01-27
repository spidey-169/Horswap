import { CID } from 'multiformats'
import { useEffect } from 'react'

export const IPFSSubpathRedirect = () => {
  function extractHashFromBasePath() {
    const htmlBase = document.querySelector('base')
    if (!htmlBase) return
    const cidRegex = /\/ipfs\/(Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,})/
    return htmlBase.href.match(cidRegex)?.at(1)
  }

  function generateIPFSRedirect() {
    const cidFromPath = extractHashFromBasePath()

    if (!cidFromPath) {
      console.log('No IPFS subpath detected')
      return
    }

    const v1CidString = CID.parse(cidFromPath).toV1().toString()
    return `${location.protocol}//${v1CidString}.ipfs.${location.host}`
  }

  useEffect(() => {
    const redirectUrl = generateIPFSRedirect()
    if (!redirectUrl) return
    window.location.href = redirectUrl
  }, [generateIPFSRedirect])

  return null
}
