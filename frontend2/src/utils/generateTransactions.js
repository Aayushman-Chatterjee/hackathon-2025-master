// src/utils/generateTransactions.js
export const generateTransactions = () => {
  const transactions = [];

  for (let i = 0; i < 20; i++) {
    const type = i % 2 === 0 ? "Credit" : "Debit";
    const amount = Math.floor(Math.random() * 1000) + 100; // Random amount between 100 and 1100
    const date = new Date();
    date.setDate(date.getDate() - i); // Random date in the past month

    transactions.push({
      id: i,
      type,
      amount,
      date: date.toLocaleDateString(),
    });
  }

  return transactions;
};
