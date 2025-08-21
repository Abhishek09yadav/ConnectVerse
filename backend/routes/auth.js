import express from "express";
const router = express.Router();
import dotenv from "dotenv";
import { forgotPassword, getUserDetails, loginUser, registerUser, resendVerificationEmail, resetPassword, verifyEmail } from "../controllers/authController.js";
dotenv.config();

router.post("/register", registerUser);

router.get("/verify-email/:token", verifyEmail);

router.post("/login",loginUser);

router.get("/user", getUserDetails);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

router.post("/resend-verification", resendVerificationEmail);

export default router;
