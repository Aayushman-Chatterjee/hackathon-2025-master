import { Badge, List } from "lucide-react";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

const Insights = ({ data }: any) => {
  const { patterns, recommendations } = data;
  const { regular_transactions, deviations } = patterns;
  const { immediate_actions, profile_impact } = recommendations;

  return (
    <div className="p-6 space-y-6 bg-gray-50 rounded-lg shadow-md">
      {/* Title/Section Header */}
      <h2 className="text-2xl font-semibold">Insights</h2>

      {/* Regular Transactions Table */}
      <Card className="bg-white shadow-md p-4">
        <h3 className="text-lg font-semibold mb-4">Regular Transactions</h3>
        <table className="min-w-full table-auto">
          <thead>
            <tr className="text-left text-sm text-gray-500">
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Average Amount</th>
              <th className="px-4 py-2">Frequency</th>
            </tr>
          </thead>
          <tbody>
            {regular_transactions.map((transaction: any, index: number) => (
              <tr key={index} className="text-gray-700">
                <td className="px-4 py-2">{transaction.category}</td>
                <td className="px-4 py-2">${transaction.average_amount}</td>
                <td className="px-4 py-2">{transaction.frequency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Deviation Insights */}
      {deviations.length > 0 && (
        <Card className="bg-white shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4">Deviation Insights</h3>
          {deviations.map((deviation: any, index: number) => (
            <div key={index} className="mb-4">
              <div className="flex items-center space-x-2">
                <Badge className="bg-red-500 text-white">
                  Unusual Spending
                </Badge>
                <span className="text-sm text-gray-600">{deviation.date}</span>
              </div>
              <div className="mt-2 text-sm text-gray-700">
                <p>
                  <strong>Amount: </strong>${deviation.amount}
                </p>
                <p>
                  <strong>Category: </strong>
                  {deviation.category}
                </p>
                {/* <Tooltip
                  content={deviation.concern}
                  className="text-xs text-gray-500 mt-2"
                >
                  <span className="underline cursor-pointer">View Concern</span>
                </Tooltip> */}
              </div>
            </div>
          ))}
        </Card>
      )}

      {/* Recommendations */}
      <Card className="bg-white shadow-md p-4">
        <h3 className="text-lg font-semibold mb-4">Recommendations</h3>

        {/* Immediate Actions */}
        <div>
          <h4 className="font-medium">Immediate Actions</h4>
          <ul className="space-y-2 mt-2">
            {immediate_actions.map((action: any, index: number) => (
              <li key={index} className="text-sm text-gray-700">
                - {action}
              </li>
            ))}
          </ul>
        </div>

        {/* Profile Impact */}
        <Separator className="my-4" />
        <div>
          <h4 className="font-medium">Profile Impact</h4>
          <p className="text-sm text-gray-700">{profile_impact}</p>
        </div>
      </Card>

      {/* Action Button */}
      <Button className="bg-blue-500 text-white hover:bg-blue-700 w-full mt-4">
        Take Action
      </Button>
    </div>
  );
};

export default Insights;
