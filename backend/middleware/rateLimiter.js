const rateLimit = require('express-rate-limit');

// Rate limiter for AI trip generation to prevent API abuse
const aiTripLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes default
  max: parseInt(process.env.RATE_LIMIT_MAX) || 10, // limit each IP to 10 requests per windowMs
  message: {
    success: false,
    message: 'Too many trip generation requests from this IP. Please try again later.'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = {
  aiTripLimiter
};
