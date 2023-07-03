const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address");
        }
      },
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minlength: true,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
    },
    address: {
      type: String,
      trim: true,
      default: "ADDRESS_NOT_SET",
    },
    city: {
      type: String,
      trim: true,
      default: "CITY_NOT_SET",
    },
    state: {
      type: String,
      trim: true,
      default: "STATE_NOT_SET",
    },
    zip: {
      type: Number,
      trim: true,
      default: 700001,
    },
    walletMoney: {
      type: Number,
      required: true,
      default: 1000,
    },
  },
  {
    timestamps: true,
  }
);

const User = new mongoose.model("User", userSchema);

module.exports = User;
