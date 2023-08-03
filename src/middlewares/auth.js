const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    // const token = req.headers.authorization;
    const token = req.cookies.jwt;
    // console.log(token);
    const verifyUser = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ _id: verifyUser._id });
    // console.log(user);
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).send("UNAUTHORIZED | Please Authenticate");
  }
};

module.exports = auth;
