import {
	adminAuth,
	clientAuth,
	signInWithEmailAndPassword,
} from "../config/firebase";

import axios from "axios";

export class AuthService {
	static async createUser(email: string, password: string) {
		return adminAuth.createUser({
			email,
			password,
			emailVerified: false,
			disabled: false,
		});
	}

	static async verifyIdToken(token: string) {
		try {
			const decodedToken = await adminAuth.verifyIdToken(token);
			return decodedToken;
		} catch (error) {
			throw new Error("Invalid or expired token");
		}
	}

	static async signInWithEmail(email: string, password: string) {
		try {
			const userCredential = await signInWithEmailAndPassword(
				clientAuth,
				email,
				password
			);
			const user = userCredential.user;
			const token = await user.getIdToken();

			console.log("token.token", user);

			return {
				uid: user.uid ?? "",
				email: user.email ?? "",
				token,
				refreshToken: user.refreshToken ?? "",
			};
		} catch (error) {
			console.info(error);
			throw new Error("Invalid credentials");
		}
	}

	static async deleteUser(uid: string) {
		try {
			await adminAuth.deleteUser(uid);
			return { success: true, message: "User deleted successfully" };
		} catch (error) {
			throw new Error("Error deleting user: " + error);
		}
	}

	static async refreshToken(refreshToken: string) {
		try {
			const url = `https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_API_KEY}`;

			const response = await axios.post(url, {
				grant_type: "refresh_token",
				refresh_token: refreshToken,
			});

			return {
				idToken: response.data.id_token,
				refreshToken: response.data.refresh_token, // New refresh token (optional)
				expiresIn: response.data.expires_in, // Expiry time (in seconds)
			};
		} catch (error) {
			throw new Error("Failed to refresh token");
		}
	}
}
