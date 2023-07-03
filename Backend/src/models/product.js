const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  pname: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  brand: {
    type: String,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true,
  },
});

const Product = new mongoose.model("Product", productSchema);

module.exports = { Product, productSchema };
