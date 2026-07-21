import admin from 'firebase-admin';

// const firebaseCredentials = JSON.parse(process.env.FIREBASE_CREDENTIALS!);

// export const db = new Firestore({
//   // projectId: firebaseCredentials.project_id,
//   // credentials: {
//   //   client_email: firebaseCredentials.client_email,
//   //   private_key: firebaseCredentials.private_key,
//   // },
//   databaseId: 'hackathon-2025',
// });

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), // Use Application Default Credentials
    // databaseURL: 'https://hackathon-2025.firebaseio.com',
  });
}

export const db = admin.firestore();
