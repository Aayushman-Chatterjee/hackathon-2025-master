import admin from "firebase-admin";
import { initializeApp } from "@firebase/app";
import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import dotenv from "dotenv";

dotenv.config();

const firebaseCredentials = JSON.parse(process.env.FIREBASE_CREDENTIALS!);

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert(firebaseCredentials),
	});
}

// Initialize Firebase Client SDK
const firebaseClientApp = initializeApp({
	apiKey: process.env.FIREBASE_API_KEY!,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN!,
});

export const adminAuth = admin.auth();
export const clientAuth = getAuth(firebaseClientApp);

export { signInWithEmailAndPassword };
