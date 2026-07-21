// src/components/Dashboard.jsx
import React, { useState } from "react";
import useStore from "../store"; // Zustand store
import ProfileSection from "./ProfileSection"; // Profile Section
import FinancialCardRow from "./FinancialCardRow"; // Financial Cards Row (Assets, Liabilities, Balance, Wishlist)
import SecondCardRow from "./SecondCardRow"; // Charts for Spending
import FeedSection from "../Molecules/FeedSection"; // Feed Section
import generateYearlySpendingData from "../utils/generateYearlySpendingData";
import { calculateProfileScore } from "../Molecules/calculation";

const Dashboard = () => {
  let { userData } = useStore(); // Zustand global state for user data
  userData = userData?.userData ? userData?.userData : userData;
  const {
    basic_info,
    assets,
    liabilities,
    wishlists = {},
    investments = {},
    profile_score,
    spending_data,
    transactions,
  } = userData;

  // Convert the spending data to an array (in case it's an object)
  const spendingDataArray = spending_data ? Object.values(spending_data) : [];

  // Generate yearly spending data
  const yearlySpendingData = generateYearlySpendingData(spendingDataArray);

  // Example of dynamic feed items (can be customized with real-time data)
  const feedItems = [
    {
      id: 1,
      title: "Asset Update",
      description: "New asset acquired: $5000 worth of Gold",
    },
    {
      id: 2,
      title: "Liability Alert",
      description: "Student Loan payment due in 3 days.",
    },
    {
      id: 3,
      title: "Investment Tip",
      description: "Stocks are up by 5% this month.",
    },
    {
      id: 4,
      title: "Balance Update",
      description: "Total savings reached $30,000.",
    },
  ];

  return (
    <div className="flex">
      {/* Left Section (Main Content) */}
      <div className="flex-1 p-6 space-y-6  dark:bg-indigo-300 ">
        <ProfileSection basicInfo={basic_info} profileScore={profile_score} />
        <FinancialCardRow
          assets={Object.values(assets)}
          liabilities={Object.values(liabilities)}
          wishlists={Object.values(wishlists)}
          investments={Object.values(investments)}
          basicInfo={basic_info}
        />
        <SecondCardRow
          spendingDataArray={spendingDataArray}
          yearlySpendingData={yearlySpendingData}
          transactions={transactions}
        />
      </div>

      {/* Right Section */}
      <FeedSection feedItems={feedItems} />
    </div>
  );
};

export default Dashboard;
