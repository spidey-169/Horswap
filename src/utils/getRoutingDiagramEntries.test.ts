import { TEST_TRADE_EXACT_INPUT } from 'test-utils/constants'

import getRoutingDiagramEntries from './getRoutingDiagramEntries'

describe.skip('getRoutingDiagramEntries', () => {
  it('returns entries for a trade', () => {
    expect(getRoutingDiagramEntries(TEST_TRADE_EXACT_INPUT)).toMatchSnapshot()
  })
})
