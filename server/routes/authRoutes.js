import express from "express";
const router = express.Router();
import {
  login,
  signup,
  loginTraditional,
  registerTraditional,
  resendVerificationEmail,
  verifyEmail,
} from "../controllers/authController.js";
import "express-async-errors";

router.post("/login", login);
router.post("/signup", signup);

router.post("/loginTraditional", loginTraditional);
router.post("/registerTraditional", registerTraditional);

router.post("/resend-verification-email", resendVerificationEmail);
router.patch("/verify-email", verifyEmail);

export default router;
