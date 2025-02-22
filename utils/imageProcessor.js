const axios = require("axios");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const { STORAGE_PATH } = require("../config");

async function downloadImage(url) {
  const response = await axios({
    url,
    method: "GET",
    responseType: "arraybuffer"
  });
  return Buffer.from(response.data, "binary");
}

async function processImage(buffer) {
  // Compress the image to 50% quality for JPEG images.
  return sharp(buffer)
    .jpeg({ quality: 50 })
    .toBuffer();
}

async function storeImage(buffer, fileName) {
  const filePath = path.join(STORAGE_PATH, fileName);
  await fs.promises.writeFile(filePath, buffer);
  return filePath;
}

module.exports = { downloadImage, processImage, storeImage };
