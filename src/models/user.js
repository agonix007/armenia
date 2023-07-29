const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
      default: config.default_wallet_money,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
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
    console.log(error.message);
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
    console.log(error.message);
  }
};

userSchema.methods.generateAuthToken = async function () {
  try {
    const token = await jwt.sign(
      { _id: this._id.toString() },
      process.env.SECRET_KEY
    );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error.message);
  }
};

userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  } catch (error) {
    res.send(error);
  }
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
