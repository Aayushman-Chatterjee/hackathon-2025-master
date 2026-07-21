import { Router } from "express";
import {
	registerUser,
	verifyUserToken,
	deleteUser,
	signIn,
	refreshTokenController,
} from "../controllers/authController";

const router = Router();

router.post("/register", registerUser);

router.post("/verify-token", verifyUserToken);

router.delete("/delete-user/:uid", deleteUser);

router.post("/sign-in", signIn);
/*@ts-ignore*/
router.post("/refresh-token", refreshTokenController);

export default router;
