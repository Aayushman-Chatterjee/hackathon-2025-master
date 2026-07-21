import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registering Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const YearlySpendingChart = ({ yearlyData }) => {
  // Prepare the data for the chart
  const chartData = {
    labels: yearlyData.map((item) => item.month), // Months as labels
    datasets: [
      {
        label: "Yearly Spending",
        data: yearlyData.map((item) => item.amount), // Monthly spending amount
        backgroundColor: "rgba(75, 192, 192, 0.5)", // Light teal background color
        borderColor: "rgb(75, 192, 192)", // Border color same as line
        borderWidth: 1,
      },
    ],
  };

  // Chart options for font color and other customizations
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "white", // White font color for the legend
        },
      },
      tooltip: {
        titleColor: "white", // White title color in tooltips
        bodyColor: "white", // White body color in tooltips
        footerColor: "white", // White footer color in tooltips
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white", // White color for x-axis labels
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // Light white grid lines
        },
      },
      y: {
        ticks: {
          color: "white", // White color for y-axis labels
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // Light white grid lines
        },
      },
    },
  };

  return (
    <div className="bg-gradient-to-br from-indigo-600 via-purple-500 to-indigo-600 shadow-xl rounded-lg p-6 mb-6 hover:scale-105 transition-all duration-300">
      <h2 className="text-2xl font-semibold text-white mb-4">
        Yearly Spending
      </h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default YearlySpendingChart;
