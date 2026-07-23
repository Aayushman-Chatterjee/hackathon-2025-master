import { useState } from "react";
import { Dialog } from "@radix-ui/react-dialog";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
} from "../ui/dialog";
import { Card } from "../ui/card";
import { ChartLineIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { title } from "process";

const insightsData = [
  {
    title: "Investment Opportunities",
    content: [
      {
        suggestion: "Invest in Real Estate",
        reasoning:
          "According to your profile 'Real Estate Master', you have a liking towards real estate investments.",
        starting_amount: "$20,000",
        expected_return: "9-12% annually",
      },
      {
        suggestion: "Diversify into Index Funds",
        reasoning:
          "To protect yourself from volatile investments, it is beneficial to diversify.",
        starting_amount: "$10,000",
        expected_return: "5-10% annually",
      },
    ],
  },
  {
    title: "Spending Optimization",
    content: [
      {
        category: "Credit Card Debt",
        current_spending: "$15,000",
        potential_savings: "$1,800 annually",
        suggestion: "Pay off the credit card debt quickly.",
      },
      {
        category: "Luxury Dining",
        current_spending: "$300",
        potential_savings: "$1,800 annually",
        suggestion: "Minimize luxury dining expenses.",
      },
    ],
  },
];

const ClickableCarousel = ({ data }: { data: any }) => {
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const closeDialog = () => {
    setIsOpen(false);
    setSelectedCard(null);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
  };

  return (
    <Card className="p-8 w-full h-full pb-10 relative overflow-hidden">
      <div className="absolute -top-4 -left-16 -translate-y-1/2 rounded-full w-96 h-96 blur-3xl mix-blend opacity bg-melrose-100 dark:bg-melrose-300"></div>
      <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 rounded-full w-96 h-96 blur-3xl mix-blend bg-melrose-200 dark:bg-melrose-400"></div>
      <Slider {...settings} className="w-full h-full">
        {Object.keys(data.group1_insights)
          .map((e) => {
            return {
              title: e,
              content: data.group1_insights[e],
            };
          })
          .filter((e) => e.title !== "goal_achievement")
          .flatMap(({ title, content }: { title: any; content: any }) =>
            content?.map((item: any) => ({ title, ...item }))
          )
          .map((item: any, index: any) => (
            <AnimatePresence key={`insights-${index}`} propagate>
              <InsightCard item={item} index={index} />
            </AnimatePresence>
            // <div key={index}>
            //   <div
            //     onClick={() => openDialog(item)}
            //     className="bg-white p-6 rounded-lg cursor-pointer h-[200px]"
            //   >
            //     <h2 className="text-xl font-bold">{item.title}</h2>
            //     <p className="mt-2">Click here to view detailed insights.</p>
            //   </div>
            // </div>
          ))}
      </Slider>

      <Dialog open={isOpen} onOpenChange={closeDialog}>
        <DialogOverlay className="fixed inset-0 bg-black/30" />
        <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-lg shadow-lg p-6">
          <DialogTitle className="text-xl font-bold">
            {selectedCard?.title}
          </DialogTitle>
          <DialogDescription className="mt-2">
            {selectedCard?.content.map(
              (contentItem: any, contentIndex: number) => (
                <div key={contentIndex} className="mt-4">
                  {contentItem.suggestion ? (
                    <>
                      <h4 className="font-bold">{contentItem.suggestion}</h4>
                      <p>{contentItem.reasoning}</p>
                      <p>
                        <strong>Starting Amount:</strong>{" "}
                        {contentItem.starting_amount}
                      </p>
                      <p>
                        <strong>Expected Return:</strong>{" "}
                        {contentItem.expected_return}
                      </p>
                    </>
                  ) : (
                    <>
                      <p>Status: {contentItem.status}</p>
                      <p>
                        Missing Milestones:{" "}
                        {contentItem.missing_milestones.join(", ")}
                      </p>
                      <h4 className="font-semibold mt-4">Action Items:</h4>
                      <ul className="list-disc list-inside">
                        {contentItem.action_items.map(
                          (action: any, actionIndex: number) => (
                            <li key={actionIndex}>{action}</li>
                          )
                        )}
                      </ul>
                    </>
                  )}
                </div>
              )
            )}
            <button
              onClick={closeDialog}
              className="mt-4 bg-blue-500 text-white rounded px-4 py-2"
            >
              Close
            </button>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ClickableCarousel;

export const InsightCard = ({ item }: { item: any; index: number }) => {
  const isInvestment = item.title === "investment_opportunities";
  const isSpending = item.title === "spending_optimization";
  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="h-full w-full flex flex-col px-4"
    >
      <h2 className="text-sm capitalize">{item.title.replace("_", " ")}</h2>
      <div className="flex flex-col gap-4 my-auto justify-center">
        <span>
          {isInvestment
            ? "You can earn"
            : isSpending
            ? "You can save"
            : "Your goals are:"}
        </span>
        <span className="font-bold text-4xl inline-flex gap-2 items-center">
          {isInvestment
            ? item.starting_amount
            : isSpending
            ? item.potential_savings
            : item.status}
          {isInvestment && <ChartLineIcon />}
        </span>
        {
          <p>
            if you <span className="underline">{item.suggestion}</span>
          </p>
        }
      </div>
    </motion.div>
  );
};
