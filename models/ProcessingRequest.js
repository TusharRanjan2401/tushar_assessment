const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    serial_number: {
        type: String
    },
    product_name: {
        type: String,
        required: true
    },
    input_image_urls: {
        type: [String],
        required: true
    },
    output_image_urls: {
        type: [String],
        default: []
    }
});

const ProcessingRequestSchema = new mongoose.Schema({
    request_id: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ["pending", "processing", "completed"],
        default: "pending"
    },
    products: {
        type: [ProductSchema],
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("ProcessingRequest", ProcessingRequestSchema);
