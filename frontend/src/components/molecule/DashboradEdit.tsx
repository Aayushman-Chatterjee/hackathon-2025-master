import React, { useEffect, useState } from "react";
import { getUserData, saveUserData } from "@/lib/firebase.util";
import { Card, CardContent, CardHeader } from "../ui/card";
import AssetTableCard from "./AssetTableCard";
import LiabilityTableCard from "./LiabilityTableCard";
import useUserStore from "@/store";
import InsuranceTableCard from "./InsuranceTableCard";
import GoalTableCard from "./GoalTableCard";
import InvestmentTableCard from "./InvestmentTableCard";
import TransactionTableCard from "./TransactionTableCard";

const DashboardEdit = () => {
  const setUserData = useUserStore((state) => state.setUserData);

  const userId = useUserStore((state) => state.userId);

  const userData = useUserStore((state) => state.userData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (id: string) => {
      if (!userData && !loading) {
        setLoading(true);
        try {
          const res = await getUserData(id);
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

  if (!userData) return <h1>Loading</h1>;

  const handleDeleteAsset = async (id: any) => {
    let assets = userData?.assets;
    assets = assets.filter((asset: any) => asset?.id !== id);
    setUserData({ ...userData, assets: assets });
  };
  const handleUpdateAsset = async (id: any, updatedAsset: any) => {
    let assets = userData?.assets;
    assets = assets.map((asset: any) =>
      asset?.id == id ? updatedAsset : asset
    );
    setUserData({ ...userData, assets: assets });
  };
  const handleAddAsset = async (newAsset: any) => {
    let assets = userData?.assets;
    assets.push(newAsset);
    setUserData({ ...userData, assets: assets });
  };

  const handleDeleteLiability = async (id: any) => {
    let liabilities = userData?.liabilities;
    liabilities = liabilities.filter((liability: any) => liability?.id !== id);
    setUserData({ ...userData, liabilities: liabilities });
  };
  const handleUpdateLiability = async (id: any, updatedAsset: any) => {
    let liabilities = userData?.liabilities;
    liabilities = liabilities.map((asset: any) =>
      asset?.id == id ? updatedAsset : asset
    );
    setUserData({ ...userData, liabilities: liabilities });
  };
  const handleAddLiability = async (newLiabilities: any) => {
    let liabilities = userData?.liabilities;
    liabilities.push(newLiabilities);
    setUserData({ ...userData, liabilities: liabilities });
  };

  const handleDeleteInsurance = async (id: any) => {
    let insurances = userData?.insurances; // Replace liabilities with insurances
    insurances = insurances.filter((insurance: any) => insurance?.id !== id);
    setUserData({ ...userData, insurances: insurances }); // Update insurances in userData
  };

  const handleUpdateInsurance = async (id: any, updatedInsurance: any) => {
    let insurances = userData?.insurances; // Replace liabilities with insurances
    insurances = insurances.map(
      (insurance: any) => (insurance?.id == id ? updatedInsurance : insurance) // Update insurance by id
    );
    setUserData({ ...userData, insurances: insurances }); // Update insurances in userData
  };

  const handleAddInsurance = async (newInsurance: any) => {
    let insurances = userData?.insurances; // Replace liabilities with insurances
    insurances.push(newInsurance); //  insurance
    setUserData({ ...userData, insurances: insurances }); // Update insurances in userData
  };

  const handleDeleteGoal = async (id: any) => {
    let goals = userData?.goals; // Replace insurances with goals
    goals = goals.filter((goal: any) => goal?.id !== id);
    setUserData({ ...userData, goals: goals }); // Update goals in userData
  };

  const handleUpdateGoal = async (id: any, updatedGoal: any) => {
    let goals = userData?.goals; // Replace insurances with goals
    goals = goals.map(
      (goal: any) => (goal?.id == id ? updatedGoal : goal) // Update goal by id
    );
    setUserData({ ...userData, goals: goals }); // Update goals in userData
  };

  const handleAddGoal = async (newGoal: any) => {
    let goals = userData?.goals; // Replace insurances with goals
    goals.push(newGoal); //  goal
    setUserData({ ...userData, goals: goals }); // Update goals in userData
  };

  const handleDeleteInvestment = async (id: any) => {
    let investments = userData?.investments; // Replace with investments
    investments = investments.filter(
      (investment: any) => investment?.id !== id
    );
    setUserData({ ...userData, investments: investments }); // Update investments in userData
  };

  const handleUpdateInvestment = async (id: any, updatedInvestment: any) => {
    let investments = userData?.investments; // Replace with investments
    investments = investments.map(
      (investment: any) =>
        investment?.id == id ? updatedInvestment : investment // Update investment by id
    );
    setUserData({ ...userData, investments: investments }); // Update investments in userData
  };

  const handleAddInvestment = async (newInvestment: any) => {
    let investments = userData?.investments; // Replace with investments
    investments.push(newInvestment); //  investment
    setUserData({ ...userData, investments: investments }); // Update investments in userData
  };

  const handleDeleteTransaction = async (id: any) => {
    let transactions = userData?.transactions; // Replace with transactions
    transactions = transactions.filter(
      (transaction: any) => transaction?.id !== id
    );
    setUserData({ ...userData, transactions: transactions }); // Update transactions in userData
  };

  const handleUpdateTransaction = async (id: any, updatedTransaction: any) => {
    let transactions = userData?.transactions; // Replace with transactions
    transactions = transactions.map(
      (transaction: any) =>
        transaction?.id == id ? updatedTransaction : transaction // Update transaction by id
    );
    setUserData({ ...userData, transactions: transactions }); // Update transactions in userData
  };

  const handleAddTransaction = async (newTransaction: any) => {
    let transactions = userData?.transactions; // Replace with transactions
    transactions.push(newTransaction); //  transaction
    setUserData({ ...userData, transactions: transactions }); // Update transactions in userData
  };
  const ganerateRandomTransactions = () => {
    // src/utils/generateTransactions.js

    const transactionsNew = [];
    let transactions = userData?.transactions; // Replace with transactions
    let lastid = transactions.length
      ? transactions[transactions.length - 1].id
      : 0;
    let newId = Number(lastid.split("_")[1]) + 1;
    for (let i = 0; i < 20; i++) {
      const type = i % 2 === 0 ? "Credit" : "Debit";
      const categories = [
        "Food",
        "Entertainment",
        "Travel",
        "EMIs",
        "Investment",
        "Income",
      ];

      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];

      const amount = Math.floor(Math.random() * 1000) + 100; // Random amount between 100 and 1100
      const date = new Date();
      date.setDate(date.getDate() - i); // Random date in the past month
      const ids = Number(newId) + i;
      transactionsNew.push({
        id: "transaction_" + ids,
        category: randomCategory,
        transaction_type: type,
        amount,
        transaction_date: date.toLocaleDateString("en-CA"),
      });
    }

    setUserData({
      ...userData,
      transactions: [...transactions, ...transactionsNew],
    }); // Update transactions in userData;
    return transactions;
  };

  console.log("userData", userData);

  return (
    userData?.assets && (
      <div className="flex flex-wrap gap-6 md:justify-between justify-start container self-center">
        <div className="p-6 grid gap-6 md:grid-cols-2 grid-cols-1">
          {/* Deviation Card */}
          <AssetTableCard
            assets={Object.values(userData?.assets)}
            handleDeleteAsset={handleDeleteAsset}
            handleUpdateAsset={handleUpdateAsset}
            handleAddAsset={handleAddAsset}
          />
          <LiabilityTableCard
            liabilities={Object.values(userData?.liabilities)}
            handleDeleteLiability={handleDeleteLiability}
            handleUpdateLiability={handleUpdateLiability}
            handleAddLiability={handleAddLiability}
          />

          <GoalTableCard
            goals={Object.values(userData?.goals || [])} // Ensure goals is an array
            handleDeleteGoal={handleDeleteGoal}
            handleUpdateGoal={handleUpdateGoal}
            handleAddGoal={handleAddGoal}
          />

          <InsuranceTableCard
            insurances={Object.values(userData?.insurances)}
            handleDeleteInsurance={handleDeleteInsurance}
            handleUpdateInsurance={handleUpdateInsurance}
            handleAddInsurance={handleAddInsurance}
          />

          <InvestmentTableCard
            investments={Object.values(userData?.investments || [])} // Ensure investments is an array
            handleDeleteInvestment={handleDeleteInvestment}
            handleUpdateInvestment={handleUpdateInvestment}
            handleAddInvestment={handleAddInvestment}
          />

          <TransactionTableCard
            transactions={Object.values(userData?.transactions || [])} // Ensure transactions is an array
            handleDeleteTransaction={handleDeleteTransaction}
            handleUpdateTransaction={handleUpdateTransaction}
            handleAddTransaction={handleAddTransaction}
            ganerateRandomTransactions={ganerateRandomTransactions}
          />
        </div>
      </div>
    )
  );
};

export default DashboardEdit;
