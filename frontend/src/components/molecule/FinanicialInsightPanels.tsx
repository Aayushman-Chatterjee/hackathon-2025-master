import { Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Wallet,
  PiggyBank,
  Check,
  GitPullRequest,
  GitBranch,
} from "lucide-react"; // Example icons
import { TimelineLayout } from "./timeline";

const FinancialInsightPanels = ({
  passive_income,
  savings_optimization,
}: any) => {
  return (
    <Card className="w-full h-full">
      <Tabs defaultValue="passive_income" className="w-full max-w-max p-4">
        <TabsList className="flex space-x-4 p-2 rounded-md w-full">
          <TabsTrigger
            value="passive_income"
            className=" text-accent-foreground/40 w-full"
          >
            Passive Income
          </TabsTrigger>
          <TabsTrigger
            value="savings_optimization"
            className=" text-accent-foreground/40 w-full"
          >
            Savings Optimization
          </TabsTrigger>
        </TabsList>

        {/* Passive Income Tab Content */}
        <TabsContent value="passive_income" className="p-4 space-y-6 ">
          <h3 className="text-2xl font-semibold mb-4">
            Passive Income Opportunities
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {passive_income?.opportunities?.map((item: any, index: number) => (
              <div
                key={index}
                className="p-6 bg-accent rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <p className="text-sm mb-2">
                  Potential income: <strong>{item.potential_income}</strong>
                </p>
                <h4 className="text-xl font-semibold flex items-center mb-2">
                  <Wallet className="text-green-600 mr-3" />
                  <ul>
                    {item.action_steps.map((item: string) => (
                      <li className="text-xs font-normal">- {item}</li>
                    ))}
                  </ul>
                </h4>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Savings Optimization Tab Content */}
        <TabsContent value="savings_optimization" className="p-4 space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Savings Optimization
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <TimelineLayout
              animate
              className="w-full max-w-2xl mx-auto p-8 flex items-center justify-center"
              connectorColor="primary"
              iconColor="primary"
              items={
                Object.entries(savings_optimization.milestones)
                  .reverse()
                  .map(([key, value], index) => ({
                    color: undefined,
                    date: `${key.replace("_", " ")} Goal`,
                    description: value as string,
                    icon: <PiggyBank className=" text-melrose-400" />,
                    id: index,
                    status: "completed",
                    title: `${key.replace("_", " ")} Goal`,
                  })) || [
                  {
                    color: undefined,
                    date: "value",
                    description:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    icon: <Check />,
                    id: 1,
                    status: "completed",
                    title: "First event",
                  },
                  {
                    color: undefined,
                    date: "2024-02-01",
                    description:
                      "Aut eius excepturi ex recusandae eius est minima molestiae.",
                    icon: <GitPullRequest />,
                    id: 2,
                    status: "in-progress",
                    title: "Second event",
                  },
                  {
                    color: undefined,
                    date: "2024-03-01",
                    description:
                      "Sit culpa quas ex nulla animi qui deleniti minus.",
                    icon: <GitBranch />,
                    id: 3,
                    status: "pending",
                    title: "Third event",
                  },
                ]
              }
              size="md"
            />
            {/* {Object.entries(savings_optimization.milestones).map(
              ([key, value], index) => (
                <div
                  key={index}
                  className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <h4 className="text-xl font-semibold text-gray-800 flex items-center mb-2">
                    <PiggyBank className="text-yellow-600 mr-3" />
                    {key} Goal
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Monthly Allocation: <strong>Enter value here</strong>{" "}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    Goal: <strong>{value as string}</strong>
                  </p>
                  <p className="text-sm text-gray-500">
                    Description: <strong>Enter description here</strong>{" "}
                  </p>
                </div>
              )
            )} */}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default FinancialInsightPanels;
