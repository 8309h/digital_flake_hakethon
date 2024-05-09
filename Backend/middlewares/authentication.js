const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error authenticating token:', error.message);
    res.status(403).json({ message: 'Token is not valid' });
  }
};

module.exports = authentication;