import { Trans } from '@lingui/macro'
import { useWeb3React } from '@web3-react/core'
import { Portal } from 'nft/components/common/Portal'
import { Overlay } from 'nft/components/modals/Overlay'
import { signListingRow } from 'nft/components/profile/list/utils'
import { useNFTList } from 'nft/hooks'
import { ListingStatus } from 'nft/types'
import { useCallback, useEffect, useMemo, useReducer } from 'react'
import { X } from 'react-feather'
import styled from 'styled-components'
import { BREAKPOINTS } from 'theme'
import { ThemedText } from 'theme/components'
import { Z_INDEX } from 'theme/zIndex'

import { TitleRow } from '../shared'
import { ListModalSection, Section } from './ListModalSection'
import { SuccessScreen } from './SuccessScreen'

const ListModalWrapper = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 420px;
  z-index: ${Z_INDEX.modal};
  background: ${({ theme }) => theme.surface1};
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.surface3};
  box-shadow: ${({ theme }) => theme.deprecated_deepShadow};
  padding: 20px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media screen and (max-width: ${BREAKPOINTS.sm}px) {
    width: 100%;
    height: 100%;
  }
`

export const ListModal = ({ overlayClick }: { overlayClick: () => void }) => {
  const { provider } = useWeb3React()
  const signer = provider?.getSigner()
  const { setListingStatusAndCallback, setLooksRareNonce, getLooksRareNonce, collectionsRequiringApproval, listings } =
    useNFTList(
      ({
        setListingStatusAndCallback,
        setLooksRareNonce,
        getLooksRareNonce,
        collectionsRequiringApproval,
        listings,
      }) => ({
        setListingStatusAndCallback,
        setLooksRareNonce,
        getLooksRareNonce,
        collectionsRequiringApproval,
        listings,
      })
    )

  const [openSection, toggleOpenSection] = useReducer(
    (s) => (s === Section.APPROVE ? Section.SIGN : Section.APPROVE),
    Section.APPROVE
  )
  const allCollectionsApproved = useMemo(
    () => collectionsRequiringApproval.every((collection) => collection.status === ListingStatus.APPROVED),
    [collectionsRequiringApproval]
  )

  const allListingsApproved = useMemo(
    () => listings.every((listing) => listing.status === ListingStatus.APPROVED),
    [listings]
  )

  const signListings = async () => {
    if (!signer || !provider) return
    // sign listings
    for (const listing of listings) {
      await signListingRow(listing, signer, provider, getLooksRareNonce, setLooksRareNonce, setListingStatusAndCallback)
    }
  }

  // Once all collections have been approved, go to next section and start signing listings
  useEffect(() => {
    if (allCollectionsApproved) {
      signListings()
      openSection === Section.APPROVE && toggleOpenSection()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allCollectionsApproved])

  const closeModalOnClick = useCallback(() => {
    allListingsApproved ? window.location.reload() : overlayClick()
  }, [allListingsApproved, overlayClick])

  // In the case that a user removes all listings via retry logic, close modal
  useEffect(() => {
    !listings.length && closeModalOnClick()
  }, [listings, closeModalOnClick])

  return (
    <Portal>
      <ListModalWrapper>
        {allListingsApproved ? (
          <SuccessScreen overlayClick={closeModalOnClick} />
        ) : (
          <>
            <TitleRow>
              <ThemedText.HeadlineSmall lineHeight="28px">
                <Trans>List NFTs</Trans>
              </ThemedText.HeadlineSmall>
              <X size={24} cursor="pointer" onClick={closeModalOnClick} />
            </TitleRow>
            <ListModalSection
              sectionType={Section.APPROVE}
              active={openSection === Section.APPROVE}
              content={collectionsRequiringApproval}
              toggleSection={toggleOpenSection}
            />
            <ListModalSection
              sectionType={Section.SIGN}
              active={openSection === Section.SIGN}
              content={listings}
              toggleSection={toggleOpenSection}
            />
          </>
        )}
      </ListModalWrapper>
      <Overlay onClick={closeModalOnClick} />
    </Portal>
  )
}
