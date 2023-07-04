const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const config = require("../config/config");

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
      minlength: 6,
      maxlength: 12,
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
      default: config.default_address,
    },
    city: {
      type: String,
      trim: true,
      default: config.default_city,
    },
    state: {
      type: String,
      trim: true,
      default: config.default_state,
    },
    zip: {
      type: Number,
      trim: true,
      default: config.default_zip,
    },
    walletMoney: {
      type: Number,
      required: true,
      default: config.default_wallet_money,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.isEmailTaken = async function (email) {
  try {
    const userEmail = await this.findOne({ email: email });
    if (!userEmail) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    res.send(error.message);
  }
};

userSchema.methods.isPasswordMatch = async function (password) {
  try {
    const isValid = await bcrypt.compare(password, this.password);
    if (isValid) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    res.send(error.message);
  }
};

userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  } catch (error) {
    res.send(error);
  }
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
