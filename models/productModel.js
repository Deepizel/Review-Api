const mongoose = require("mongoose");

const ProductScheme = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product Name is required"],
    },
    description: {
        type: String,
        required: [true, "Product Description is required"],
    },
    price: {
        type: Number,
        required: [true, "Product Price is required"],
        min: [0, "Product Price must be greater than 0"],
    },
    image: {
        type: String,
        required: [true, "Product Image is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }

});

const Product = mongoose.models.Product || mongoose.model("Product", ProductScheme);
module.exports = Product;