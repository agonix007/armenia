const mongoose = require("mongoose");
const { Cart, cartSchema } = require("./cart");
const config = require("../config/config");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
    default: config.default_address,
  },
  userCart: [
    {
      orderedItems: { type: cartSchema },
      orderedAt: { type: Date, default: Date.now },
    },
  ],
});

companySchema.methods.orderHistory = async function () {
  try {
    const cart = await Cart.findOne({ email: this.email });
    this.userCart = this.userCart.concat({orderedItems: cart});
    await this.save();
  } catch (error) {
    console.log(error.message);
  }
};

const Company = new mongoose.model("Company", companySchema);

module.exports = Company;
