import { OffchainActivityModal } from 'components/AccountDrawer/MiniPortfolio/Activity/OffchainActivityModal'
import AddressClaimModal from 'components/claim/AddressClaimModal'
import { UkDisclaimerModal } from 'components/NavBar/UkDisclaimerModal'
import DevFlagsBox from 'dev/DevFlagsBox'
import { useModalIsOpen, useToggleModal } from 'state/application/hooks'
import { ApplicationModal } from 'state/application/reducer'
import { isDevelopmentEnv, isStagingEnv } from 'utils/env'

export default function TopLevelModals() {
  const addressClaimOpen = useModalIsOpen(ApplicationModal.ADDRESS_CLAIM)
  const addressClaimToggle = useToggleModal(ApplicationModal.ADDRESS_CLAIM)
  const shouldShowDevFlags = isDevelopmentEnv() || isStagingEnv()

  return (
    <>
      <AddressClaimModal isOpen={addressClaimOpen} onDismiss={addressClaimToggle} />
      <OffchainActivityModal />
      <UkDisclaimerModal />
      {shouldShowDevFlags && <DevFlagsBox />}
    </>
  )
}
