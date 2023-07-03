const mongoose = require("mongoose");
const { productSchema } = require("./product");

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
  paymentOptions: {
    type: String,
    default: "DEFAULT_PAYMENT_OPTION",
  },
});

const Cart = new mongoose.model("Cart", cartSchema);

module.exports = Cart;
