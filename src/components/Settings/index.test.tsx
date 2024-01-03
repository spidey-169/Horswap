import { Percent } from '@uniswap/sdk-core'
import { isSupportedChain } from 'constants/chains'
import { mocked } from 'test-utils/mocked'
import { fireEvent, render, screen, waitFor } from 'test-utils/render'

import SettingsTab from './index'

const slippage = new Percent(75, 10_000)
jest.mock('constants/chains')

describe('Settings Tab', () => {
  describe('showRoutingSettings', () => {
    beforeEach(() => {
      mocked(isSupportedChain).mockReturnValue(true)
    })

    it('renders routing settings', async () => {
      render(<SettingsTab chainId={1} autoSlippage={slippage} />)

      const settingsButton = screen.getByTestId('open-settings-dialog-button')
      fireEvent.click(settingsButton)

      await waitFor(() => {
        expect(screen.getByTestId('toggle-local-routing-button')).toBeInTheDocument()
      })
    })
  })
})
