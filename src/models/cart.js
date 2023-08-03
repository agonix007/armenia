const mongoose = require("mongoose");
const { productSchema } = require("./product");
const config = require("../config/config");

const cartSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  cartItems: [
    {
      product: { type: productSchema },
      quantity: { type: Number },
    },
  ],
  total: {
    type: Number,
    default: 0
  },
  paymentOptions: {
    type: String,
    default: config.default_payment_option,
  },
});

const Cart = new mongoose.model("Cart", cartSchema);

module.exports = {
  Cart,
  cartSchema
}
