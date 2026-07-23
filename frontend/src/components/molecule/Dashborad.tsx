import { getUserData } from "@/lib/firebase.util";
import DeviationCard from "./DeviationCard";
import { useEffect, useState } from "react";
import useUserStore from "@/store";
// import recommendations from "../../recommendationss/output.json";
import Loader from "../ui/Loader";
import GoalAchievement from "./GoalAchievement";
import FinancialInsightPanels from "./FinanicialInsightPanels";
import BudgetPanel from "./BudgetPanel";
import FinancialProfile from "./FinancialProfile";
import ClickableCarousel from "./ClickableCarousel";
import { calculateProfileScore } from "./calculation";

const Dashboard = () => {
  const setUserData = useUserStore((state) => state.setUserData);

  const userId = useUserStore((state) => state.userId);

  const userData = useUserStore((state) => state.userData);
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(
    userData?.recommendations ? userData?.recommendations : {}
  );
  const assetVal = userData?.assets.reduce(
    (acc: any, item: any) => acc + item.value,
    0
  );
  const liabilitiesVal = userData?.liabilities.reduce(
    (acc: any, item: any) => acc + Number(item.amount),
    0
  );
  const goalsVal = userData?.goals.reduce(
    (acc: any, item: any) => acc + item.amount,
    0
  );
  const insuranceVal = userData?.insurances.reduce(
    (acc: any, item: any) => acc + item.amount,
    0
  );
  const investmentsVal = userData?.investments.reduce(
    (acc: any, item: any) => acc + item.amount,
    0
  );
  const pScore = calculateProfileScore(
    assetVal,
    liabilitiesVal,
    goalsVal,
    insuranceVal,
    investmentsVal
  );

  useEffect(() => {
    setRecommendations(userData?.recommendations);
  }, [userData]);

  if (userData) userData.basic_info.profile_score = pScore;

  useEffect(() => {
    const fetchData = async (id: string) => {
      if (!userData && !loading) {
        setLoading(true);
        try {
          const res = await getUserData(id);
          setRecommendations(res?.recommendations);
          console.log("Fetched user data:", res);
          if (res) {
            setUserData(res); // Update Zustand store with fetched data
            setLoading(false);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    if (userId && !userData) {
      fetchData(userId);
    }
  }, [userId, setUserData]); // Added `loading` to prevent unnecessary re-fetches

  if (!userData) return <Loader />;
  return (
    <>
      <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 flex-wrap container self-center">
        <ClickableCarousel data={recommendations} />

        {recommendations?.classification && (
          <div className="flex-1 h-full min-w-[300px]">
            <FinancialProfile
              userData={userData}
              classification={recommendations?.classification}
              score={pScore}
            />
          </div>
        )}

        <div className="flex-1 min-w-[300px]">
          <DeviationCard recommendations={userData?.recommendations} />
        </div>
        {recommendations?.group3_insights?.passive_income &&
          recommendations?.group3_insights?.savings_optimization && (
            <div className=" min-w-[200px] col-span-1">
              <FinancialInsightPanels
                passive_income={recommendations?.group3_insights.passive_income}
                savings_optimization={
                  recommendations?.group3_insights.savings_optimization
                }
              />
            </div>
          )}
        {recommendations?.group1_insights?.goal_achievement && (
          <div className=" min-w-[200px] col-span-1">
            <GoalAchievement
              data={recommendations?.group1_insights.goal_achievement}
            />
          </div>
        )}

        {recommendations?.group3_insights?.budgeting && (
          <div className=" min-w-[200px] col-span-1">
            <BudgetPanel
              budgeting={recommendations?.group3_insights.budgeting}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
