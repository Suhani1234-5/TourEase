const jwt = require('jsonwebtoken');

/**
 * Protects routes that require a logged-in user.
 * Expects: Authorization: Bearer <token>
 */
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. Please log in.',
    });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // JWT payload uses `userId`; controllers expect `id` — support both
    const uid = verified.userId || verified.id;
    req.user = { ...verified, id: uid, userId: uid };
    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token.',
    });
  }
};

module.exports = { verifyToken };
