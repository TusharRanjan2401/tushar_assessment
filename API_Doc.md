# Image Processing System

## Overview
This project processes image data from CSV files asynchronously, compresses images, stores results in a MongoDB database, and provides APIs for upload, status checking, and webhook notifications.

## Tech Stack
- **Backend:** Node.js with Express
- **Database:** MongoDB with Mongoose
- **File Handling:** Multer
- **Image Processing:** Sharp
- **UUID Generation:** UUID
- **Asynchronous Processing:** Worker threads

---

## API Documentation

### 1. Upload CSV File
**Endpoint:** `POST /upload`

**Description:** Accepts a CSV file, validates its format, assigns a unique request ID, and starts asynchronous image processing.

**Request:**
- **Headers:** `Content-Type: multipart/form-data`
- **Body:** `file` (CSV file containing image URLs)

**Response:**
```json
{
  "request_id": "123e4567-e89b-12d3-a456-426614174000",
  "message": "Upload successful, processing started."
}
```

---

### 2. Check Processing Status
**Endpoint:** `GET /status`

**Description:** Retrieves the status of an image processing request using the request ID.

**Request:**
- **Query Parameter:** `request_id`

**Response:**
```json
{
  "request_id": "123e4567-e89b-12d3-a456-426614174000",
  "status": "completed",
  "products": [
    {
      "serial_number": "1",
      "product_name": "SKU1",
      "input_image_urls": ["https://example.com/input1.jpg"],
      "output_image_urls": ["https://example.com/output1.jpg"]
    }
  ]
}
```

---

### 3. Webhook Integration (Bonus Feature)
**Endpoint:** `POST /webhook`

**Description:** External service endpoint triggered when image processing is complete.

**Request:**
- **Body:**
```json
{
  "request_id": "123e4567-e89b-12d3-a456-426614174000",
  "status": "completed",
  "products": [
    {
      "serial_number": "1",
      "product_name": "SKU1",
      "input_image_urls": ["https://example.com/input1.jpg"],
      "output_image_urls": ["https://example.com/output1.jpg"]
    }
  ]
}
```

**Response:**
```json
{
  "message": "Webhook received successfully."
}
```

---

## Asynchronous Workers Documentation

The system processes images asynchronously using worker threads. Once a CSV file is uploaded:
1. **Worker extracts image URLs** from CSV.
2. **Downloads images**, compresses them using Sharp.
3. **Stores compressed images** and updates MongoDB.
4. **Triggers webhook** when processing is complete.

Each processing request is tracked in MongoDB with statuses: `pending`, `processing`, or `completed`.

---

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/TusharRanjan2401/tushar_assessment.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

Make sure MongoDB is running locally or provide a connection string in `.env` file.

