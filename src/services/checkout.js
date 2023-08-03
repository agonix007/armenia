const { Cart } = require("../models/cart");
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
    if (cart.paymentOptions === "wallet") {
      let total = 0;
      cart.cartItems.forEach((item) => {
        total = total + item.product.price * item.quantity;
      });
      if (total > user.walletMoney) {
        throw new Error("Insufficient wallet money");
      }
      user.walletMoney -= total;
      await user.save();
    }
    const order = await Company.findOne({ email: user.email });
    if (!order || order === null) {
      const company = new Company({
        name: user.name,
        email: user.email,
        address: `${user.address}, ${user.city}, ${user.state}, ${user.zip}`,
      });
      await company.orderHistory();
      await company.save();
    } else {
      await order.orderHistory();
      await order.save();
    }
    cart.cartItems = [];
    cart.total = 0;
    await cart.save();
  }
};

const orderedItems = async (user) => {
  const order = await Company.findOne({ email: user.email });
  if (!order || order === null) {
    throw new Error("User hasn't ordered any products yet");
  }
  return order;
};

const getOrderItemsById = async (user, id) => {
  const order = await Company.findOne({ email: user.email });
  const item = order.userCart.find(
    (item) => item._id.toString() === id
  );
  return item;
};

module.exports = { checkouts, orderedItems, getOrderItemsById };
