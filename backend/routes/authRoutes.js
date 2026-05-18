const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const passport = require("passport");
// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', signup);
//Google Auth
router.get(
  "/google",
  (req, res, next) => {
    const isGoogleRegistered = !!(passport._strategies && passport._strategies["google"]);
    if (!isGoogleRegistered) {
      return res.status(400).json({
        success: false,
        message: "Google Authentication is not configured on this server. Please add GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_CALLBACK_URL to your backend .env file to enable this feature."
      });
    }
    passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
  }
);
router.get(
  "/google/callback",
  (req, res, next) => {
    const isGoogleRegistered = !!(passport._strategies && passport._strategies["google"]);
    if (!isGoogleRegistered) {
      return res.status(400).json({
        success: false,
        message: "Google Authentication is not configured on this server."
      });
    }
    passport.authenticate("google", { session: false })(req, res, next);
  },
  (req, res) => {
    const { token } = req.user;
    const frontendUrl = process.env.FRONTEND_URL || process.env.CLIENT_URL || "http://localhost:5173";
    res.redirect(
      `${frontendUrl}/oauth-success?token=${token}`
    );
  }
);
// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', login);

module.exports = router;

