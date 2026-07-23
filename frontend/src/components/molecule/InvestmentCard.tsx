import { Card, CardContent, CardHeader } from "../ui/card";
import data from "../../mocks/output.json";
import { ChartBar, CreditCard, House, UtensilsCrossed } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
export default function InvestmentCard() {
  return (
    <Card className="w-full h-full max-w-4xl mx-auto p-4 rounded-lg">
      <Tabs defaultValue="investment" className="w-full">
        {/* Tab List */}
        <TabsList className="flex w-full">
          <TabsTrigger value="investment" className="w-full">
            Investment
          </TabsTrigger>
          <TabsTrigger value="spending" className="w-full">
            Spending
          </TabsTrigger>
        </TabsList>

        {/* Investment Tab Content */}
        <TabsContent value="investment" className="p-4 space-y-6">
          <h3 className="text-2xl font-semibold mb-4">
            Investment Opportunities
          </h3>
          {data.group1_insights.investment_opportunities.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-gray-50 dark:bg-neutral-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <h4 className="text-xl font-semibold flex items-center mb-2">
                {item.suggestion === "Invest in Real Estate" ? (
                  <House className="text-green-600 mr-3" />
                ) : (
                  <ChartBar className=" text-melrose-500  mr-3" />
                )}
                {item.suggestion}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-200 mb-2">
                Start with: <strong>{item.starting_amount}</strong>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-200 mb-2">
                Expected Return: <strong>{item.expected_return}</strong>
              </p>
              <p className="text-sm text-gray-400">{item.reasoning}</p>
            </div>
          ))}
        </TabsContent>

        {/* Spending Tab Content */}
        <TabsContent value="spending" className="p-4 space-y-6">
          <h3 className="text-2xl font-semibold mb-4">Expenses Optimization</h3>
          {data.group1_insights.spending_optimization.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-gray-50 dark:bg-neutral-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <h4 className="text-xl font-semibold flex items-center mb-2">
                {item.category === "Credit Card Debt" ? (
                  <CreditCard className="text-red-600 mr-3" />
                ) : (
                  <UtensilsCrossed className="text-yellow-600 mr-3" />
                )}
                {item.category}
              </h4>
              <p className="text-sm text-gray-200 mb-2">
                Current Spending: <strong>{item.current_spending}</strong>
              </p>
              <p className="text-sm text-gray-200 mb-2">
                Potential Savings: <strong>{item.potential_savings}</strong>
              </p>
              <p className="text-sm text-gray-400">{item.suggestion}</p>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </Card>
  );
}
