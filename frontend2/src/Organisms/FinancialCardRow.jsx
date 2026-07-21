// src/components/FinancialCardRow.jsx
import React, { useState } from "react";
import { HiHome, HiCreditCard, HiCash } from "react-icons/hi"; // Icons for the cards
import { FaCar } from "react-icons/fa"; // Car icon
import AssetCard from "../Molecules/AssetCard";
import LiabilityCard from "../Molecules/LiabilityCard";
import BalanceCard from "../Molecules/BalanceCard";
import WishlistCard from "../Molecules/WishlistCard";
import InvestmentCard from "../Molecules/InvestmentCard";
// State for dynamically adding/removing assets, liabilities, wishlist, and investments

const FinancialCardRow = ({
  assets,
  liabilities,
  basicInfo,
  wishlists,
  investments,
}) => {
  const [assetsState, setAssetsState] = useState(assets);
  const [liabilitiesState, setLiabilitiesState] = useState(liabilities);
  const [wishlistState, setWishlistState] = useState(wishlists);
  const [investmentsState, setInvestmentsState] = useState(investments);

  const handleAddAsset = ({ asset, value }) => {
    const newAsset = {
      type: asset,
      value: value,
    };
    setAssetsState([...assetsState, newAsset]);
  };

  const handleDeleteAsset = (key) => {
    setAssetsState(assetsState.filter((_, index) => index !== key));
  };

  const handleAddLiability = ({ type, amount }) => {
    const newLiability = { type, amount };
    setLiabilitiesState([...liabilitiesState, newLiability]);
  };
  const handleDeleteLiability = (key) => {
    setLiabilitiesState(liabilitiesState.filter((_, index) => index !== key));
  };

  const handleAddWishlistItem = (name) => {
    const newWishlistItem = { name: name };
    setWishlistState([...wishlistState, newWishlistItem]);
  };

  const handleDeleteWishlistItem = (index) => {
    setWishlistState(wishlistState.filter((_, idx) => idx !== index));
  };

  const handleAddInvestment = ({ name, amount }) => {
    const newInvestment = { name, amount };
    setInvestmentsState([...investmentsState, newInvestment]);
  };

  const handleDeleteInvestment = (index) => {
    setInvestmentsState(investmentsState.filter((_, idx) => idx !== index));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
      <AssetCard
        assets={Object.values(assetsState)}
        basicInfo={basicInfo}
        handleAddAsset={handleAddAsset}
        handleDeleteAsset={handleDeleteAsset}
      />
      <LiabilityCard
        liabilities={Object.values(liabilitiesState)}
        handleAddLiability={handleAddLiability}
        handleDeleteLiability={handleDeleteLiability}
      />
      <WishlistCard
        wishlist={Object.values(wishlistState)}
        onAddWishlistItem={handleAddWishlistItem}
        onDeleteWishlistItem={handleDeleteWishlistItem}
      />
      <InvestmentCard
        investments={Object.values(investmentsState)}
        handleAddInvestment={handleAddInvestment}
        handleDeleteInvestment={handleDeleteInvestment}
      />
    </div>
  );
};

export default FinancialCardRow;
