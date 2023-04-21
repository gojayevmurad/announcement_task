import jwt from "jsonwebtoken";
import dotenv from "dotenv";

//? JWT
const createToken = (id, isAdmin = false) => {
  return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// Middleware to check JWT token
const checkToken = (req, res, next) => {
  // Get token from authorization header
  const token = req.headers["authorization"]
    ? req.headers["authorization"].split(" ")[1]
    : null;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    if (!decoded.isAdmin) {
      return res.status(403).json({ error: "Not authorized" });
    }
    // If token is valid and user is admin, continue to the next middleware/handler
    next();
  });
};

export { createToken, checkToken };
