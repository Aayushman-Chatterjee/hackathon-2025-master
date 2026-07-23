import { Pie } from "react-chartjs-2"; // Import Pie chart from react-chartjs-2
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
// Register the necessary Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  ChartDataLabels
);

const PieChartComponent = ({ pieChartLabels, pieChartData }: any) => {
  // Define the data for the pie chart
  pieChartData = pieChartData.map((item: any) => Number(item.split("%")[0]));
  const data = {
    labels: pieChartLabels, // Labels for the slices
    datasets: [
      {
        data: pieChartData, // Data for each slice of the pie
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Slice colors
        hoverBackgroundColor: ["#FF6F91", "#42A5F5", "#FFEB3B"], // Hover colors
      },
    ],
  };

  // Define options (optional)
  const options = {
    responsive: true, // Makes the chart responsive
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            return `${tooltipItem.label}: ${tooltipItem.raw}`; // Format tooltip text (optional)
          },
        },
      },
    },
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-[300px] h-[300px]">
        <Pie data={data} options={options as any} />
      </div>
    </div>
  );
};

export default PieChartComponent;
