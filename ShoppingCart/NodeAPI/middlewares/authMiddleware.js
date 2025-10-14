// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../datamodel/userDataModel");

const authenticate = async (req, res, next) => {
  const token = req.cookies?.jwt;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized request!" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verified.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User no longer exists." });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token!" });
  }
};

module.exports = { authenticate };
