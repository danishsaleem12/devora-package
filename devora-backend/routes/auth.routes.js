const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

// POST /api/auth/login
router.post("/auth/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.json({ token });
});

module.exports = router;