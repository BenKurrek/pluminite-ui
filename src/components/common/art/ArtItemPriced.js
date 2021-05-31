import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { getNextBidNearsFormatted } from '../../../utils/nears';

import { MarketContractContext } from '../../../contexts';

import ArtItem from './ArtItem';

const ArtItemPriced = ({ gemOnSale, bid, bidAvailable, ...props }) => {
  const { offer, marketContract } = useContext(MarketContractContext);

  const processBid = async (e) => {
    e.preventDefault();

    await offer(gemOnSale.token_id, +getNextBidNearsFormatted(gemOnSale));
  };

  const isItemOwnedByUser = () => gemOnSale?.owner_id === marketContract.account.accountId;

  return (
    <ArtItem
      buttonText={isItemOwnedByUser() ? null : `Buy for ${bid}Ⓝ`}
      isButtonDisabled={!bidAvailable}
      {...props}
      onButtonClick={processBid}
    />
  );
};

ArtItemPriced.propTypes = {
  bid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  bidAvailable: PropTypes.bool,
  // todo: add type for union of nft and sale
  gemOnSale: PropTypes.object,
};

ArtItemPriced.defaultProps = {
  bidAvailable: true,
};

export default ArtItemPriced;
