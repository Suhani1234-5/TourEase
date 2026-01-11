// Load environment variables
require("dotenv").config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');


// Connect to MongoDB
connectDB()

// Initialize Express app
const app = express();
//Google Auth
const passport = require("passport");
require("./config/passport");


app.use("/api/auth", require("./routes/authRoutes"));

// Middleware
// app.use(cors({
//   origin: process.env.FRONTEND_URL ||'https://tour-ease-joh5.vercel.app' || 'http://localhost:5173',
//   credentials: true,
// }));
const allowedOrigins = [
  "https://tour-ease-joh5.vercel.app",
  "http://localhost:5173",
  "https://tourease-2.onrender.com",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);

// Enhanced health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: "ok",
    message: "Server is running",
    environment: process.env.NODE_ENV || "development",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});


app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// 404 handler must be LAST
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});