import express from "express";
const router = express.Router();
import { login, signup } from "../controllers/authController.js";
import "express-async-errors";

router.post("/login", login);
router.post("/signup", signup);

export default router;
