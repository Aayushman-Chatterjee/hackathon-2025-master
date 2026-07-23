export const calculateProfileScore = (
  assets,
  liabilities,
  goals,
  insurance,
  investments
) => {
  // Helper function to score each category
  function scoreCategory(value, lowThreshold, midThreshold, highThreshold) {
    if (value <= lowThreshold) return 2;
    if (value <= midThreshold) return 5;
    if (value <= highThreshold) return 8;
    return 10;
  }

  // Define thresholds for scoring
  const assetThresholds = { low: 0, mid: 50000, high: 500000 }; // Adjust thresholds based on your context
  const liabilityThresholds = { low: 0, mid: 20000, high: 100000 };
  const goalThresholds = { low: 0, mid: 2, high: 5 }; // For example: 0 goals = 0, 2 goals = 5, 5+ goals = 10
  const insuranceThresholds = { low: 0, mid: 1, high: 2 }; // Basic insurance = 5, good insurance = 8, comprehensive = 10
  const investmentThresholds = { low: 0, mid: 10000, high: 100000 };

  // Score each category
  const assetScore = scoreCategory(
    assets,
    assetThresholds.low,
    assetThresholds.mid,
    assetThresholds.high
  );
  const liabilityScore = scoreCategory(
    liabilities,
    liabilityThresholds.low,
    liabilityThresholds.mid,
    liabilityThresholds.high
  );
  const goalScore = scoreCategory(
    goals,
    goalThresholds.low,
    goalThresholds.mid,
    goalThresholds.high
  );
  const insuranceScore = scoreCategory(
    insurance,
    insuranceThresholds.low,
    insuranceThresholds.mid,
    insuranceThresholds.high
  );
  const investmentScore = scoreCategory(
    investments,
    investmentThresholds.low,
    investmentThresholds.mid,
    investmentThresholds.high
  );

  // Calculate total profile score
  const totalScore =
    assetScore + liabilityScore + goalScore + insuranceScore + investmentScore;

  return totalScore;
};

// Example usage:
const profileScore = calculateProfileScore(100000, 50000, 3, 2, 20000);
console.log(`Your profile score is: ${profileScore}`);
