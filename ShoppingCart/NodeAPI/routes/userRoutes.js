// routes/userRoutes.js

const express = require("express");
const userRouter = express.Router({}); // options - strict, caseSensitive, etc.

const { generateToken } = require("../services/tokenGen");
const { authenticate } = require("../middlewares/authMiddleware");
const User = require("../datamodel/userDataModel");

// Helper to remove sensitive fields before sending to client
const toSafeUser = (u) => {
  if (!u) return u;
  const obj = u.toObject ? u.toObject() : u;
  delete obj.password;
  return obj;
};

// SIGN-IN/UP
userRouter.post("/api/signinup", async (req, res) => {
  try {
    const { userName } = req.body;
    if (!userName) {
      return res.status(400).json({ message: "userName is required" });
    }

    // Find existing user
    let user = await User.findOne({ userName }).select("-password");

    if (user) {
      // Sign-in
      generateToken(res, user._id);          // <-- sets jwt cookie
      return res.json(toSafeUser(user));     // send user sans password
    }

    // Sign-up
    const newUser = new User(req.body);
    const saved = await newUser.save();
    generateToken(res, saved._id);           // <-- sets jwt cookie
    return res.json(toSafeUser(saved));

  } catch (err) {
    console.error("signinup error:", err);
    return res.status(500).json({ message: "error while sign in/up" });
  }
});

userRouter.get("/auth/me", authenticate, (req, res) => {
  // authenticate adds req.user (already without password in our middleware)
  return res.json({ user: req.user });
});

// LOGOUT 
userRouter.post("/api/logout", (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return res.json({ message: "Logged out" });
});

module.exports = userRouter;
