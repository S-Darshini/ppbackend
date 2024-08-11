const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer TOKEN" format

  if (token == null) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    req.user = user; // Attach user information to the request object
    next(); // Proceed to the next middleware or route handler
  });
}

module.exports = authenticateToken;
