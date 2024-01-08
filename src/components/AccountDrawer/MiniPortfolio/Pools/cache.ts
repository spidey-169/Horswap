import { ChainId } from '@uniswap/sdk-core'
import { Pool, Position } from '@uniswap/v3-sdk'
import { PositionDetails } from 'types/position'
export type PositionInfo = {
  owner: string
  chainId: ChainId
  position: Position
  pool: Pool
  details: PositionDetails
  inRange: boolean
  closed: boolean
  fees?: [number?, number?]
  prices?: [number?, number?]
}
