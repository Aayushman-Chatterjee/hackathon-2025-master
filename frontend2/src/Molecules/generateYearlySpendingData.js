// src/utils/generateYearlySpendingData.js

const generateYearlySpendingData = (spendingData) => {
  // Initialize an empty object to hold the total spending for each year
  const yearlyData = {};

  spendingData.forEach((transaction) => {
    const date = new Date(transaction.transaction_date); // Convert to Date object
    const year = date.getFullYear(); // Extract the year from the date

    // If the year doesn't exist in yearlyData, initialize it
    if (!yearlyData[year]) {
      yearlyData[year] = { year, totalSpending: 0 };
    }

    // Add the transaction amount to the total spending for the respective year
    yearlyData[year].totalSpending += transaction.amount;
  });

  // Convert the object into an array for easier mapping and rendering
  return Object.values(yearlyData);
};

export default generateYearlySpendingData;
