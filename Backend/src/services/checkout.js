const {Cart} = require("../models/cart");
const Company = require("../models/company");
const config = require("../config/config");

const checkouts = async (user) => {
  const cart = await Cart.findOne({ email: user.email });
  if (!cart || cart === null) {
    throw new Error("User doesn't have a cart");
  } else if (cart.cartItems.length === 0) {
    throw new Error("User cart doesn't have any product");
  } else if (
    user.address === config.default_address ||
    user.city === config.default_city ||
    user.state === config.default_state ||
    user.zip === config.default_zip
  ) {
    throw new Error("Address is not set correctly");
  } else {
    let total = 0;
    cart.cartItems.forEach((item) => {
      total = total + item.product.price * item.quantity;
    });
    if (total > user.walletMoney) {
      throw new Error("User has insufficient money to checkout");
    }
    user.walletMoney -= total;
    await user.save();
    const company = new Company({
      name: user.name,
      email: user.email,
      address: `${user.address}, ${user.city}, ${user.state}, ${user.zip}`,
      userCart: cart
    });
    await company.save();
    cart.cartItems = [];
    await cart.save();
  }
};

module.exports = checkouts;
