require('dotenv').config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const passport = require("./config/passport");

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
const lockerRoutes = require("./routes/lockerRoutes");

const app = express();

app.use(helmet());
app.use(morgan("dev"));

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:3000", "http://localhost:5173", "http://localhost:7000"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/trip', tripRoutes);
app.use('/api/itinerary', itineraryRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/smart-planner', smartPlannerRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/expense', expenseRoutes);
app.use('/api/locker', lockerRoutes);

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is running smoothly" });
});

app.use((err, req, res, next) => {
  console.error("Error Fallback Logged:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

module.exports = app;