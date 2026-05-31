const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: "Access Denied: No token provided" 
    });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ 
      success: false, 
      message: "Invalid Token" 
    });
  }
};

module.exports = {
  verifyToken
};
