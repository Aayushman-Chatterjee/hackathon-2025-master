import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registering Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SpendingChart = ({ spendingData }) => {
  // Prepare the data for the chart
  const chartData = {
    labels: spendingData.map((item) =>
      new Date(item.transaction_date).toLocaleDateString()
    ), // Dates as labels
    datasets: [
      {
        label: "Spending Amount",
        data: spendingData.map((item) => item.amount), // Amount of spending
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        color: "white",
        fill: true,
        tension: 0.4, // Smooth the line
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
      <h2 className="text-2xl font-semibold text-white mb-4">Daily Spending</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default SpendingChart;
