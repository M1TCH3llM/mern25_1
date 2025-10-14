// Services/tokenGenerator.js
const jwt = require("jsonwebtoken");

/**
 * Generates a signed JWT and sets it as a cookie on the response.
 * @param {Response} res - Express response
 * @param {string} userId - Mongo ObjectId string
 */
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("jwt", token, {
    httpOnly: true,                 // prevent JS access (XSS protection)
    maxAge: 1000 * 60 * 60 * 24,    // 1 day
    sameSite: "lax",                // good default; ports 9090→9000 are same-site on localhost
    secure: isProduction,           // only require HTTPS in prod
  });
};

module.exports = { generateToken };
