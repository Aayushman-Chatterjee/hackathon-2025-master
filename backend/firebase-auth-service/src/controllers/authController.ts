import { Request, Response } from "express";
import { AuthService } from "../services/authService";

export const registerUser = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const user = await AuthService.createUser(email, password);
		res
			.status(201)
			.json({ uid: user.uid, message: "User created successfully" });
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};

export const verifyUserToken = async (req: Request, res: Response) => {
	const { token } = req.body;
	try {
		const decoded = await AuthService.verifyIdToken(token);
		res.json({ success: true, decoded });
	} catch (error: any) {
		res.status(401).json({ success: false, message: error.message });
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	const { uid } = req.params;
	try {
		const result = await AuthService.deleteUser(uid);
		res
			.status(204)
			.json({ success: true, message: "User deleted successfully" });
	} catch (error: any) {
		res.status(404).json({ success: false, message: error.message });
	}
};

export const signIn = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	try {
		const userData = await AuthService.signInWithEmail(email, password);
		res.status(200).json({ success: true, user: userData });
	} catch (error: any) {
		res.status(401).json({ success: false, message: error.message });
	}
};
/*@ts-ignore*/
export const refreshTokenController = async (req: Request, res: Response) => {
	const { refreshToken: oldRefreshToken } = req.body;
	if (!oldRefreshToken) {
		return res
			.status(400)
			.json({ success: false, message: "Refresh token is required" });
	}

	try {
		const newTokens = await AuthService.refreshToken(oldRefreshToken);
		res.status(200).json({ success: true, ...newTokens });
	} catch (error: any) {
		res.status(401).json({ success: false, message: error.message });
	}
};
