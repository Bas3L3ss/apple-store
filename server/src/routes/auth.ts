import express from "express";
import checkBearerToken from "../middlewares/check-bearer-token";
import errorHandler from "../middlewares/error-handler";
import register from "../controllers/auth/register";
import login from "../controllers/auth/login";
import loginWithToken from "../controllers/auth/login-with-token";
import editAccount from "../controllers/auth/edit-account";
import sendVerificationEmail from "../controllers/auth/send-verfication-email";
import verifyEmail from "../controllers/auth/verify-email";
import errorHandlerWithHtml from "../middlewares/error-handler";
import sendResetPasswordEmail from "../controllers/auth/send-reset-password-email";
import resetPassword from "../controllers/auth/reset-password";

// initialize router
const router = express.Router();

// POST at route: http://localhost:8080/auth/register
router.post("/register", [], register, errorHandler);

// POST at path: http://localhost:8080/auth/login
router.post("/login", [], login, errorHandler);

// GET at path: http://localhost:8080/auth/login
router.get("/login", [checkBearerToken], loginWithToken, errorHandler);

// PUT: update account
router.put("/account", [checkBearerToken, editAccount], errorHandler);

// POST at route: http://localhost:8080/auth/verify
router.post("/verify", [checkBearerToken, sendVerificationEmail], errorHandler);

// GET at route: http://localhost:8080/auth/verify?token=xyz
router.get("/verify", verifyEmail, errorHandlerWithHtml);

// POST: send account verification reset url link with jwt
router.post("/send-reset-link", sendResetPasswordEmail, errorHandler);

// POST: reset password with jwt
router.post("/reset-password", [checkBearerToken, resetPassword], errorHandler);
export default router;
