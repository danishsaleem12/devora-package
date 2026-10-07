require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

// Allow requests from the Next.js frontend (runs on port 3000 by default)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
  })
);
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Simple test route to prove frontend <-> backend connection works
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the Devora backend!" });
});

app.get("/", (req, res) => {
  res.send("Devora backend is running.");
});

// Navbar and Hero content routes (GET /api/navbar, GET /api/hero)
const contentRoutes = require("./routes/content.routes");
app.use("/api", contentRoutes);

// Auth routes (POST /api/auth/login)
const authRoutes = require("./routes/auth.routes");
app.use("/api", authRoutes);

// Jobs routes (GET/POST/PUT/DELETE /api/jobs)
const jobsRoutes = require("./routes/jobs.routes");
app.use("/api", jobsRoutes);

app.listen(PORT, () => {
  console.log(`Devora backend listening on http://localhost:${PORT}`);
});