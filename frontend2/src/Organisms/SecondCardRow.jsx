// src/components/ProfileSection.jsx
import React from "react";
import SpendingChart from "../Molecules/SpendingChart"; // SpendingChart component
import YearlySpendingChart from "../Molecules/YearlySpendingChart"; // YearlySpendingChart component
import TransactionGrid from "../Molecules/TransactionGrid"; // TransactionGrid component

const SecondCardRow = ({
  spendingDataArray,
  yearlySpendingData,
  transactions,
}) => {
  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SpendingChart spendingData={spendingDataArray} />
        {yearlySpendingData.length > 0 && (
          <YearlySpendingChart yearlyData={yearlySpendingData} />
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TransactionGrid
          transactionType={"credit"}
          transactions={transactions}
        />
        {/* Add the TransactionGrid here */}
        <TransactionGrid
          transactionType={"debit"}
          transactions={transactions}
        />{" "}
        {/* Add the TransactionGrid here */}
      </div>
    </div>
  );
};

export default SecondCardRow;
