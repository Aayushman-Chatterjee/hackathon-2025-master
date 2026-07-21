// src/utils/generateYearlySpendingData.js

const generateYearlySpendingData = (spendingData) => {
  // Initialize an object to store monthly spending by category
  const monthlySpending = {};

  // Process each spending item
  spendingData.forEach((transaction) => {
    const date = new Date(transaction.transaction_date);
    const month = date.getMonth(); // Get the month (0-11)
    const year = date.getFullYear();
    const category = transaction.category;
    const amount = transaction.amount;

    // If the month and year combination doesn't exist, create it
    if (!monthlySpending[year]) {
      monthlySpending[year] = {};
    }

    if (!monthlySpending[year][month]) {
      monthlySpending[year][month] = {};
    }

    // Add the spending amount to the specific category for the month
    if (!monthlySpending[year][month][category]) {
      monthlySpending[year][month][category] = 0;
    }

    monthlySpending[year][month][category] += amount;
  });

  // Transform the data into a structure suitable for a chart
  const yearlyData = [];
  Object.keys(monthlySpending).forEach((year) => {
    Object.keys(monthlySpending[year]).forEach((month) => {
      const monthData = { month: parseInt(month) + 1, year }; // Use month + 1 to get a 1-based month (1-12)
      const categories = monthlySpending[year][month];

      // Add the category spending for that month
      Object.keys(categories).forEach((category) => {
        monthData[category] = categories[category];
      });

      yearlyData.push(monthData);
    });
  });

  return yearlyData;
};

export default generateYearlySpendingData;
