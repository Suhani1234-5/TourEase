const path = require("path");
const dotenv = require("dotenv");

const envPath = path.join(__dirname, ".env");
console.log("[DEBUG] Current working directory:", process.cwd());
console.log("[DEBUG] __dirname:", __dirname);
console.log("[DEBUG] Loading .env from:", envPath);

const envConfig = dotenv.config({ path: envPath });
if (envConfig.error) {
  console.warn("[DEBUG] Could not load .env file:", envConfig.error.message);
}

// Default to development if not specified
process.env.NODE_ENV = process.env.NODE_ENV || "development";

console.log("[DEBUG] NODE_ENV is:", process.env.NODE_ENV);
console.log("[DEBUG] JWT_SECRET present:", !!process.env.JWT_SECRET);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const passport = require("./config/passport");
// Route Imports
const connectDB = require("./config/db");
const reviewRoutes = require("./routes/reviewRoutes");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const tripRoutes = require("./routes/tripRoutes");
const itineraryRoutes = require("./routes/itineraryRoutes");
const eventRoutes = require("./routes/eventRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const smartPlannerRoutes = require("./routes/smartPlannerRoutes");
const chatRoutes = require("./routes/chatroutes");
const expenseRoutes = require("./routes/expenseRoutes");
const lockerRoutes = require("./routes/lockerRoutes");

const app = express();

// Middleware Infrastructure
app.use(helmet());
app.use(morgan("dev"));
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:7000",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

let MONGODB_URI = process.env.MONGODB_URL;

if (!MONGODB_URI) {
  if (process.env.NODE_ENV === "development") {
    MONGODB_URI = "mongodb://localhost:27017/tourease";
    console.warn("[DB] Using local fallback for MONGODB_URL");
  } else {
    console.error("CRITICAL ERROR: MONGODB_URL is not defined in the environment variables!");
    process.exit(1);
  }
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.error("Database connection failure:", err));

// Application Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/trip', tripRoutes);
app.use('/api/itinerary', itineraryRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/smart-planner', smartPlannerRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/locker', lockerRoutes);

// Health Check Endpoint
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is running smoothly" });
});

// Global Error Interceptor
app.use((err, req, res, next) => {
  console.error("Error Fallback Logged:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// 404 Route Interceptor (Must remain at the very bottom)
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Start server helper
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
