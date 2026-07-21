// src/components/BalanceCard.jsx
import React from "react";
import { HiCash } from "react-icons/hi"; // Icon for balance

const BalanceCard = ({ basicInfo }) => {
  return (
    <div className="bg-gradient-to-tr from-blue-50 to-blue-200 shadow-lg rounded-lg p-6 flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <HiCash className="h-6 w-6 text-gray-600" />
        <h2 className="text-xl font-semibold">Balance</h2>
      </div>
      <div className="flex justify-between">
        <span>Total Savings:</span>
        <span>
          {basicInfo.total_savings} {basicInfo.currency}
        </span>
      </div>
    </div>
  );
};

export default BalanceCard;
