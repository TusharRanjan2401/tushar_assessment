# Image Processor

A Node.js project for asynchronous image processing using Mongoose and a webhook flow.

## Features

- **CSV Upload API:**  
  - Accepts CSV files containing product details and image URLs.
  - Immediately returns a unique request ID to track processing.
  - Stores product data in MongoDB.

- **Image Processing:**  
  - Downloads images from provided URLs.
  - Compresses images to reduce quality by 50%.
  - Stores processed images locally.

- **Status API:**  
  - Fetches processing status using the unique request ID.
  - Returns success, failure, or pending states.

- **Webhook Integration:**  
  - Triggers a webhook callback once all images are processed.
  - Sends processed image URLs and metadata to the webhook.

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **File Upload:** Multer
- **CSV Parsing:** csv-parser
- **Image Processing:** Sharp
- **HTTP Requests:** Axios

## Setup

### Clone the Repository
```bash
git clone https://github.com/yourusername/mongoose-image-processor.git
cd mongoose-image-processor
```

### Install Dependencies
```bash
npm install
```

### Create a `.env` File
Create a `.env` file in the project root with the following variables:
```
PORT=3000
WEBHOOK_URL=http://localhost:4000/webhook
MONGODB_URI=mongodb://localhost:27017/image_processing
```

### Create the Storage Directory
```bash
mkdir storage
```

### Start MongoDB
Ensure MongoDB is running locally.

### Start the Webhook Server (For Testing)
```bash
node webhookServer.js
```

### Start the API Server
```bash
node api.js
```

## API Documentation
Refer to [API Documentation](API_DOCUMENTATION.md) for detailed specifications.

## Worker Functions
Refer to [Asynchronous Workers Documentation](WORKER_DOCUMENTATION.md) for worker function details.

## CSV File Format

Your CSV file should have the following format:
```csv
S. No.,Product Name,Input Image Urls
1,SKU1,"https://example.com/image1.jpg, https://example.com/image2.jpg"
2,SKU2,"https://example.com/image3.jpg, https://example.com/image4.jpg"
```

## License

[MIT License](LICENSE)

