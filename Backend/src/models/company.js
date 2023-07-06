const mongoose = require("mongoose");
const {cartSchema} = require("./cart");
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
  userCart: {
    type: cartSchema,
  },
});

const Company = new mongoose.model("Company", companySchema);

module.exports = Company;
