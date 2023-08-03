const { Cart } = require("../models/cart");

const authCheckout = async (req, res, next) => {
  const cart = await Cart.findOne({ email: req.user.email });
  if (!cart || cart === null || cart.cartItems.length === 0) {
    return res.redirect("/cart");
  }
  next();
};

module.exports = authCheckout;
