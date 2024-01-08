import express from "express";
import passport from "passport";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication, redirect or handle the response
    res.json({ message: "Successfully authenticated with Google OAuth." });
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: "Successfully logged out." });
});

export default router;
