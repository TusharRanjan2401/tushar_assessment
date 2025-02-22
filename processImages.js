const { downloadImage, processImage, storeImage } = require("./utils/imageProcessor");
const ProcessingRequest = require("./models/ProcessingRequest");
const axios = require("axios");
const config = require("./config");

async function processRequestImages(processingRequest) {
  processingRequest.status = "processing";
  processingRequest.updated_at = new Date();
  await processingRequest.save();

  for (let productIndex = 0; productIndex < processingRequest.products.length; productIndex++) {
    const product = processingRequest.products[productIndex];

    if (!product.output_image_urls) {
      product.output_image_urls = [];
    }
    for (let imageIndex = 0; imageIndex < product.input_image_urls.length; imageIndex++) {
      const imageUrl = product.input_image_urls[imageIndex];
      try {
        const originalBuffer = await downloadImage(imageUrl);
        const processedBuffer = await processImage(originalBuffer);
        const fileName = `${processingRequest.request_id}-${productIndex}-${imageIndex}.jpg`;
        const storedPath = await storeImage(processedBuffer, fileName);
        product.output_image_urls[imageIndex] = storedPath;
      } catch (error) {
        console.error(`Error processing image ${imageUrl}:`, error);
      }
    }
  }

  processingRequest.status = "completed";
  processingRequest.updated_at = new Date();
  await processingRequest.save();

  try {
    await axios.post(config.WEBHOOK_URL, {
      request_id: processingRequest.request_id,
      status: processingRequest.status,
      products: processingRequest.products
    });
    console.log(`Webhook triggered for request ${processingRequest.request_id}`);
  } catch (err) {
    console.error(`Error triggering webhook for request ${processingRequest.request_id}:`, err);
  }
}

module.exports = processRequestImages;
