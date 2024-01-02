import { OffchainActivityModal } from 'components/AccountDrawer/MiniPortfolio/Activity/OffchainActivityModal'
import AirdropModal from 'components/AirdropModal'
import AddressClaimModal from 'components/claim/AddressClaimModal'
import FiatOnrampModal from 'components/FiatOnrampModal'
import { UkDisclaimerModal } from 'components/NavBar/UkDisclaimerModal'
import DevFlagsBox from 'dev/DevFlagsBox'
import Bag from 'nft/components/bag/Bag'
import TransactionCompleteModal from 'nft/components/collection/TransactionCompleteModal'
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
      <Bag />
      <OffchainActivityModal />
      <TransactionCompleteModal />
      <AirdropModal />
      <FiatOnrampModal />
      <UkDisclaimerModal />
      {shouldShowDevFlags && <DevFlagsBox />}
    </>
  )
}
