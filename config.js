require("dotenv").config();

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/image_processing",
  STORAGE_PATH: "./storage", 
  PORT: process.env.PORT || 3000,
  WEBHOOK_URL: process.env.WEBHOOK_URL || "http://localhost:4000/webhook" 
};
