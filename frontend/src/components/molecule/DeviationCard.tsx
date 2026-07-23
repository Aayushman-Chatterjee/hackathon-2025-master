import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
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
import useUserStore from "@/store";
import { InfoIcon } from "lucide-react";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DeviationCard = ({ recommendations }: { recommendations: any }) => {
  const [selectedCategory, setSelectedCategory] = useState("Food");
  const transactions = useUserStore(
    (state: any) => state.userData.transactions
  );

  // Helper function to format the date into a month-year format
  const getMonthYear = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "long" });
    // const year = date.getFullYear();
    return `${month}`;
  };

  // Memoize the chart data calculation to avoid unnecessary re-calculations
  const groupedData = useMemo(() => {
    // Group transactions by category and month-year
    const grouped: Record<string, Record<string, number>> = {};

    transactions.forEach((transaction: any) => {
      const { category, amount, transaction_date } = transaction;
      const monthYear = getMonthYear(transaction_date);

      if (!grouped[category]) {
        grouped[category] = {};
      }

      if (!grouped[category][monthYear]) {
        grouped[category][monthYear] = 0;
      }

      grouped[category][monthYear] += amount;
    });

    return grouped;
  }, [transactions]);

  // Extract categories dynamically from the transactions
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(transactions.map((transaction: any) => transaction.category))
    );
    return uniqueCategories;
  }, [transactions]);

  // Get the data for the selected category
  const selectedCategoryData = groupedData[selectedCategory] || {};

  // Get the labels (months) and data points for the chart
  const labels = Object.keys(selectedCategoryData);
  const chartData = {
    labels: labels.length ? labels : ["No Data"], // Default label if no data exists
    datasets: [
      {
        label: `${selectedCategory} Spending`,
        data: labels.map((month) => selectedCategoryData[month]),
        backgroundColor: "rgba(100, 100, 255, 0.2)",
        borderColor: "rgba(100, 100, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Deviation in ${selectedCategory} Spending`,
      },
    },
  };

  const handleCategoryChange = (e: any) => {
    setSelectedCategory(e.target.value); // Update the selected category
  };

  return (
    <Card className="h-full">
      <CardHeader className="text-center text-lg font-semibold ">
        Deviation in Transactions
      </CardHeader>
      <CardContent className="h-full flex flex-col items-center justify-start">
        {/* Dropdown to select category */}
        <div className="mb-4 flex gap-4 w-full justify-center items-center">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-500"
          >
            Select Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full max-w-52 p-2 border rounded-md text-sm bg-transparent"
          >
            {categories.map((category: any) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Bar chart */}
        <Bar data={chartData} options={options as any} />

        {
          <div className="mt-4 text-left text-neutral-400 inline-flex gap-1 justify-center items-start">
            <InfoIcon size={16} className="mt-1 mx-2" />
            {recommendations?.group2_insights?.recommendations?.immediate_actions?.at(
              0
            )}
          </div>
        }
      </CardContent>
    </Card>
  );
};

export default DeviationCard;
