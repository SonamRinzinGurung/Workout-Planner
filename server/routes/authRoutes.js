import express from "express";
const router = express.Router();
import {
  login,
  signup,
  loginTraditional,
  registerTraditional,
  resendVerificationEmail,
} from "../controllers/authController.js";
import "express-async-errors";

router.post("/login", login);
router.post("/signup", signup);

router.post("/loginTraditional", loginTraditional);
router.post("/registerTraditional", registerTraditional);

router.post("/resend-verification-email", resendVerificationEmail);

export default router;
