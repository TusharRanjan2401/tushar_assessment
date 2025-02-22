// api.js
const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const parseCSV = require("./utils/csvParser");
const processRequestImages = require("./processImages");
const ProcessingRequest = require("./models/ProcessingRequest");
const config = require("./config");

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

mongoose.connect(config.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB using Mongoose"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "CSV file is required" });
    }

    const csvString = req.file.buffer.toString("utf-8");
    const rows = await parseCSV(csvString);

    const products = rows.map((row) => {
      const inputUrls = row["Input Image Urls"]
        .split(",")
        .map(url => url.trim())
        .filter(url => url.length > 0);
      return {
        serial_number: row["S. No."] || null,
        product_name: row["Product Name"],
        input_image_urls: inputUrls,
        output_image_urls: [] 
      };
    });

    const request_id = uuidv4();
    const processingRequest = new ProcessingRequest({
      request_id,
      status: "pending",
      products,
      created_at: new Date(),
      updated_at: new Date()
    });

    await processingRequest.save();

    processRequestImages(processingRequest)
      .then(() => {
        console.log(`Processing complete for request: ${request_id}`);
      })
      .catch((err) => {
        console.error(`Error processing request ${request_id}:`, err);
      });

    res.json({ request_id, message: "Upload successful, processing started." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/status", async (req, res) => {
  const { request_id } = req.query;
  if (!request_id) {
    return res.status(400).json({ error: "request_id is required" });
  }
  const processingRequest = await ProcessingRequest.findOne({ request_id });
  if (!processingRequest) {
    return res.status(404).json({ error: "Request not found" });
  }
  res.json({
    request_id: processingRequest.request_id,
    status: processingRequest.status,
    products: processingRequest.products
  });
});

app.listen(config.PORT, () => {
  console.log(`API server listening on port ${config.PORT}`);
});
