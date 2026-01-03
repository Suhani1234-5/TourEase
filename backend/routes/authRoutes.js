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
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const { token } = req.user;
    res.redirect(
      `${process.env.CLIENT_URL}/oauth-success?token=${token}`
    );
  }
);
// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', login);

module.exports = router;

