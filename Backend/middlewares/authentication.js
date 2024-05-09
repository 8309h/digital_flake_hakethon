const jwt = require('jsonwebtoken');
const TokenModel = require("../models/tokenModel");

const authentication = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
    // Verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Check if token exists in the database
    const tokenExists = await TokenModel.findOne({ token });

    if (!tokenExists) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Pass user ID to the request object for further processing
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    console.error('Error authenticating token:', error.message);
    res.status(403).json({ message: 'Token is not valid' });
  }
};

module.exports = authentication;
