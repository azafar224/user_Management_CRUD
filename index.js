// index.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes");
const cookieRoutes = require("./routes/cookieRoutes");
const errorHandler = require("./middleware/errorHandler");

require("dotenv").config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan("dev")); // HTTP request logging

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API Routes
app.use("/users", userRoutes);
app.use("/cookies", cookieRoutes);

// Frontend Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/create.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "create.html"));
});

app.get("/get.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "get.html"));
});

app.get("/update.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "update.html"));
});

app.get("/delete.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "delete.html"));
});

app.get("/cookies.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "cookies.html"));
});

// Error Handling Middleware (should be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
