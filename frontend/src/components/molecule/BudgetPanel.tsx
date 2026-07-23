import { Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ChartBar, Wallet, PiggyBank, Info } from "lucide-react"; // Example icons
import PieChartComponent from "../ui/piechart";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const BudgetPanel = ({ budgeting }: any) => {
  const pieChartLabels: any = [];
  const pieChartData: any = [];
  Object.entries(budgeting.recommended_splits).map(([category, allocation]) => {
    pieChartLabels.push(category);
    pieChartData.push(allocation);
    return;
  });
  return (
    <Card className="w-full relative mx-auto p-4 bg-white rounded-lg shadow-md h-full items-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="absolute right-4">
              <Info />
            </button>
          </TooltipTrigger>
          <TooltipContent className="max-w-80 ">
            <p>
              This budget breakdown allocates funds across essential expenses,
              investments, and discretionary spending to maintain financial
              balance. It prioritizes needs, future growth, and limits
              non-essential spending.
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Tabs
        defaultValue="budgeting"
        className="w-full h-full flex flex-col items-center "
      >
        {/* Budgeting Tab Content */}
        <TabsContent value="budgeting" className="p-4 space-y-6 mt-0">
          <h3 className="text-2xl font-semibold mb-4">Budgeting Insights</h3>
          {/* <div className="w-full h-56 mb-4"> */}
          <div className="flex pt-16">
            <PieChartComponent
              pieChartLabels={pieChartLabels}
              pieChartData={pieChartData}
            />
            {/* </div> */}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default BudgetPanel;
