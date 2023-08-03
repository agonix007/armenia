const jwt = require("jsonwebtoken");
const User = require("../models/user");

const adminAuth = async (req, res, next) => {
  try {
    // const token = req.headers.authorization;
    const token = req.cookies.jwt;
    // console.log(token);
    if (!token) {
      res.redirect("/login");
      throw new Error("UNAUTHORIZED | Please Authenticate");
    }
    const verifyUser = await jwt.verify(token, process.env.SECRET_KEY);
    if (!verifyUser) {
      res.redirect("/login");
      throw new Error("UNAUTHORIZED | Please Authenticate");
    }
    const user = await User.findOne({ _id: verifyUser._id });
    // console.log(user);
    req.token = token;
    req.user = user;
    if (req.user.bio !== "Admin") {
      res.render("noAccess");
      throw new Error("Must be Admin to access this page.");
    }
    next();
  } catch (error) {
    console.log(error.message);
    // res.json(error.message);
  }
};

module.exports = adminAuth;
