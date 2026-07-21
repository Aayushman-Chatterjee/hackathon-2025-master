// src/components/TransactionGrid.jsx
import React, { useState, useEffect } from "react";
import DataGrid from "react-data-grid"; // Importing react-data-grid
import { generateTransactions } from "../utils/generateTransactions"; // Utility for generating transactions

const TransactionGrid = ({
  transactionType,
  transactions: transactionsNew,
}) => {
  const [transactions, setTransactions] = useState([]);
  const [sortedTransactions, setSortedTransactions] = useState([]);
  const [sortType, setSortType] = useState("high"); // Sorting type: 'high' (high to low) or 'low' (low to high)

  useEffect(() => {
    const allTransactions = Object.values(transactionsNew);
    setTransactions(allTransactions);
    setSortedTransactions(allTransactions);
  }, []);

  const handleSort = (type) => {
    let sorted = [...transactions];
    if (type === "high") {
      sorted.sort((a, b) => b.amount - a.amount); // Sort from high to low
    } else if (type === "low") {
      sorted.sort((a, b) => a.amount - b.amount); // Sort from low to high
    }
    setSortedTransactions(sorted);
    setSortType(type);
  };

  const last10Transactions = sortedTransactions
    .filter(
      (transaction) =>
        transaction?.transaction_type?.toLowerCase() === transactionType
    )
    .slice(0, 10); // Take the top 10

  const columns = [
    { key: "date", name: "Date", resizable: true },
    { key: "type", name: "Type", resizable: true },
    {
      key: "amount",
      name: "Amount",
      resizable: true,
      width: 150,
      formatter: ({ value }) => `$${value}`,
    },
  ];

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Recent Transactions {transactionType}
      </h2>

      {/* Sort Buttons */}
      <div className="flex justify-start space-x-4 mb-4">
        <button
          className={`px-6 py-2 rounded-lg ${
            sortType === "high" ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
          onClick={() => handleSort("high")}
        >
          High to Low
        </button>
        <button
          className={`px-6 py-2 rounded-lg ${
            sortType === "low" ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
          onClick={() => handleSort("low")}
        >
          Low to High
        </button>
      </div>

      {/* Data Grid for Transactions */}
      <div className="overflow-hidden shadow-md rounded-lg">
        <div className="bg-gray-100 text-white from-indigo-500   to-purple-600">
          <div className="text-white bg-gradient-to-rp-4  text-white from-indigo-500 to-purple-600 grid grid-cols-3 gap-4 border-b-2  text-gray-700 font-semibold">
            <div>Date</div>
            <div>Type</div>
            <div>Amount</div>
          </div>
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {last10Transactions.map((transaction, index) => (
            <div
              key={index}
              className={`bg-gradient-to-r text-white from-indigo-500 to-purple-600 grid grid-cols-3 gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <div>{transaction.transaction_date}</div>
              <div>{transaction.type}</div>
              <div>${transaction.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionGrid;
