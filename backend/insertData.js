// const admin = require('firebase-admin');

const { Firestore } = require('@google-cloud/firestore');

// Initialize Firebase Admin SDK
const serviceAccount = process.env.SERVICE_ACCOUNT;

const db = new Firestore({
  databaseId: 'hackathon-2025',
  projectId: serviceAccount.project_id,
  credentials: {
    client_email: serviceAccount.client_email,
    private_key: serviceAccount.private_key,
  },
});
// const db = admin.firestore();

// Sample user data
const sampleUserId = 'user_1004';

const sampleUserData = {
  basic_info: {
    name: 'David Brown',
    age: 40,
    income: 8500,
    monthly_expenses: 4500,
    total_savings: 30000,
    employment_status: 'Employed',
    job_title: 'Marketing Director',
    city: 'Chicago',
    currency: 'USD',
    monthly_salary_date: '2025-01-01',
  },
  assets: {
    asset_1: {
      type: 'Home',
      value: 400000,
      loan_balance: 150000,
    },
    asset_2: {
      type: 'Stock Portfolio',
      value: 100000,
      loan_balance: 0,
    },
  },
  liabilities: {
    liability_1: {
      type: 'Home Loan',
      amount: 150000,
      emi: 1800,
    },
    liability_2: {
      type: 'Credit Card Debt',
      amount: 8000,
      emi: 300,
    },
  },
  profile_score: {
    score: 720,
    last_updated: '2025-01-01',
  },
  spending_data: {
    spending_1: {
      category: 'Investment Contribution',
      amount: 1500,
      transaction_date: '2025-01-04',
      transaction_type: 'Credit',
      account: 'Bank Account',
      merchant: 'Fidelity Investments',
    },
    spending_2: {
      category: 'Credit Card Payment',
      amount: 300,
      transaction_date: '2025-01-06',
      transaction_type: 'Debit',
      account: 'Bank Account',
      merchant: 'Bank of America Credit',
    },
  },
};
// Function to insert user data into Firestore
const insertUserData = async (userId, userData) => {
  try {
    const userRef = db.collection('users').doc(userId);

    // Insert each section into subcollections
    await Promise.all([
      insertSubCollection(userRef, 'assets', userData.assets),
      insertSubCollection(userRef, 'liabilities', userData.liabilities),
      insertSubCollection(userRef, 'spending_data', userData.spending_data),

      userRef.collection('basic_info').doc('basic_info').set(userData.basic_info),
      userRef.collection('profile_score').doc('profile_score').set(userData.profile_score),
    ]);

    console.log(`✅ User ${userId} data inserted successfully.`);
  } catch (error) {
    console.error('❌ Error inserting data:', error);
  }
};

// Helper function to insert data into a Firestore subcollection
const insertSubCollection = async (userRef, collectionName, data) => {
  const collectionRef = userRef.collection(collectionName);

  if (typeof data === 'object' && data !== null) {
    for (const [key, value] of Object.entries(data)) {
      // Ensure value is a plain object
      if (typeof value === 'object' && value !== null) {
        await collectionRef.doc(key).set({ ...value });
      }
    }
  }
};

// Run the insert function
insertUserData(sampleUserId, sampleUserData);
