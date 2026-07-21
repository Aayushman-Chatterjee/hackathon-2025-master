// src/components/ChartSection.jsx
import React from "react";
import SpendingChart from "../Molecules/SpendingChart"; // SpendingChart component
import YearlySpendingChart from "../Molecules/YearlySpendingChart"; // YearlySpendingChart component

const ChartSection = ({ spendingDataArray, yearlySpendingData }) => {
  return (
    <div>
      <SpendingChart spendingData={spendingDataArray} />
      {yearlySpendingData.length > 0 && (
        <YearlySpendingChart yearlyData={yearlySpendingData} />
      )}
    </div>
  );
};

export default ChartSection;
