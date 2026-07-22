const dotenv = require("dotenv");
dotenv.config();

console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'DEFINIDA' : 'INDEFINIDA');
console.log('PORT:', process.env.PORT);

const mongoose = require("mongoose");
const connectDB = require("./config/db");
const app = require("./app");

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("CRITICAL ERROR: MONGODB_URL is not defined in the environment variables!");
}

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();