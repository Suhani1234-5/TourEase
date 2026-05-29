const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

// Route Imports
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const tripRoutes = require("./routes/tripRoutes");
const itineraryRoutes = require("./routes/itineraryRoutes");
const eventRoutes = require("./routes/eventRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const smartPlannerRoutes = require("./routes/smartPlannerRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const chatRoutes = require("./routes/chatroutes");
const expenseRoutes = require("./routes/expenseRoutes");

dotenv.config();

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

const MONGODB_URI = process.env.MONGODB_URL;

if (!MONGODB_URI) {
  console.error("CRITICAL ERROR: MONGODB_URL is not defined in the environment variables!");
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
app.use('/api/reviews', reviewRoutes);

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

// Host Port Execution Configuration
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});