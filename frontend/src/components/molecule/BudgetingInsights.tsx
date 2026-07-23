import { Pie } from "react-chartjs-2";

const BudgetingInsights = ({ recommended_splits, specific_targets }: any) => {
  return (
    <div className="space-y-6">
      {/* Pie Chart for Recommended Splits */}
      <div className="w-full h-56 mb-4">
        <Pie
          datasets={[
            { title: "Essential Expenses", value: 60, color: "#4CAF50" },
            { title: "Investments", value: 30, color: "#2196F3" },
            { title: "Discretionary", value: 10, color: "#FF5722" },
          ]}
          label={({ data, dataIndex }: any) =>
            `${data[dataIndex].title}: ${data[dataIndex].value}%`
          }
          labelPosition={60}
        />
      </div>

      {/* Specific Budgeting Targets List */}
      <div>
        <h4 className="font-medium">Specific Budgeting Targets</h4>
        <ul className="space-y-2 mb-4">
          {Object.keys(specific_targets).map((key) => (
            <li key={key} className="text-sm text-gray-700">
              <strong>{key.replace("_", " ")}:</strong> {specific_targets[key]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BudgetingInsights;
