const crypto = require("crypto");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const requireAuth = require("../middleware/auth");
const rateLimit = require("../middleware/rateLimit");

// 10 login attempts per IP per 15 minutes (slows down password guessing)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many login attempts. Please try again in a few minutes.",
});

// Constant-time comparison (hashing first makes both sides the same length)
function safeEqual(a, b) {
  const ha = crypto.createHash("sha256").update(String(a)).digest();
  const hb = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

// POST /api/auth/login
router.post("/auth/login", loginLimiter, (req, res) => {
  const { username, password } = req.body || {};

  // Never allow a login when the admin credentials / secret are not configured
  if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD || !process.env.JWT_SECRET) {
    return res.status(500).json({ error: "Admin login is not configured on the server" });
  }

  // Check both fields every time so a wrong username and a wrong password look identical
  const userOk = safeEqual(username ?? "", process.env.ADMIN_USERNAME);
  const passOk = safeEqual(password ?? "", process.env.ADMIN_PASSWORD);
  if (!userOk || !passOk) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const token = jwt.sign({ username: process.env.ADMIN_USERNAME }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.json({ token });
});

// GET /api/auth/me — lets the frontend check that a stored token is still valid
router.get("/auth/me", requireAuth, (req, res) => {
  res.json({ ok: true });
});

module.exports = router;
