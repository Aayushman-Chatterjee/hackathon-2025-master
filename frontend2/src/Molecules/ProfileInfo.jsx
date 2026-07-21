// src/components/ProfileInfo.js
import React from "react";
import { Doughnut } from "react-chartjs-2"; // You can install chart.js for donut chart
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const ProfileInfo = ({ basicInfo, profileScore }) => {
  // Donut chart data for Profile Score
  const profileScoreData = {
    labels: ["Profile Score", "Remaining"],
    datasets: [
      {
        data: [profileScore.score, 100 - profileScore.score],
        backgroundColor: ["#4CAF50", "#E0E0E0"],
        borderWidth: 0,
      },
    ],
  };

  // Donut chart data for Income-to-Expense ratio
  const incomeExpenseData = {
    labels: ["Income-to-Expense", "Remaining"],
    datasets: [
      {
        data: [
          ((basicInfo.income - basicInfo.monthly_expenses) / basicInfo.income) *
            100,
          100 -
            ((basicInfo.income - basicInfo.monthly_expenses) /
              basicInfo.income) *
              100,
        ],
        backgroundColor: ["#2196F3", "#E0E0E0"],
        borderWidth: 0,
      },
    ],
  };
  const chartOptions = {
    plugins: {
      legend: {
        display: false, // Remove the legend
      },
      tooltip: {
        enabled: false, // Disable tooltips/slider
      },
    },
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl rounded-lg p-6 flex flex-wrap items-center space-x-6">
      <div className="flex-shrink-0 w-1/3 max-w-[200px]">
        {/* Profile Score Donut Chart */}
        <h2 className="text-3xl font-extrabold text-center mb-4">
          Profile Score
        </h2>
        <Doughnut
          data={profileScoreData}
          options={chartOptions}
          width={100}
          height={100}
        />
      </div>

      <div className="flex-shrink-0 w-1/3 max-w-[200px]">
        {/* Income to Expense Ratio Donut Chart */}
        <h2 className="text-3xl font-extrabold text-center mb-4">
          Income to Expense
        </h2>
        <Doughnut
          data={incomeExpenseData}
          options={chartOptions}
          width={100}
          height={100}
        />
      </div>

      <div className="flex-1">
        <h2 className="text-3xl font-extrabold mb-4 text-center">
          Profile Information
        </h2>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg">Name:</span>
            <span className="text-lg">{basicInfo.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg">Age:</span>
            <span className="text-lg">{basicInfo.age}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg">Income:</span>
            <span className="text-lg">
              {basicInfo.income} {basicInfo.currency}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg">Monthly Expenses:</span>
            <span className="text-lg">
              {basicInfo.monthly_expenses} {basicInfo.currency}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg">Profile Score:</span>
            <span className="text-lg">{profileScore.score}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
