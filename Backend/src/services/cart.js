const Cart = require("../models/cart");
const { Product } = require("../models/product");

const getCartByUser = async (user) => {
  const cart = await Cart.findOne({ email: user.email });
  if (!cart) {
    throw new Error("User doesn't have a cart");
  }
  return cart;
};

const addProductToCart = async (user, productId, quantity) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product doesn't exist");
  }
  product.quantity = product.quantity - quantity;
  const cart = await Cart.findOne({ email: user.email });
  if (!cart) {
    try {
      const newCart = await Cart.create({
        email: user.email,
        cartItems: [{ product: product, quantity: quantity }],
      });
      await product.save();
      return await newCart.save();
    } catch (error) {
      throw new Error("Internal Server Error");
    }
  } else {
    cart.cartItems.forEach((item) => {
      if (item.product._id.toString() === productId) {
        throw new Error("Product already exists in your cart");
      }
    });
  }
  cart.cartItems.push({ product: product, quantity: quantity });
  await product.save();
  return await cart.save();
};

const updateProductInCart = async (user, productId, quantity) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product doesn't exist");
  }
  const cart = await Cart.findOne({ email: user.email });
  if (!cart) {
    throw new Error("User doesn't have a cart");
  }
  const cartItemIndex = cart.cartItems.findIndex(
    (item) => item.product._id.toString() === productId
  );
  if (cartItemIndex === -1) {
    throw new Error("Product doesn't exist in your cart");
  }

  product.quantity = product.quantity + cart.cartItems[cartItemIndex].quantity;
  product.quantity = product.quantity - quantity;
  cart.cartItems[cartItemIndex].quantity = quantity;
  cart.cartItems[cartItemIndex].product.quantity = product.quantity;

  await product.save();
  return await cart.save();
};

const deleteProductFromcart = async (user, productId) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product doesn't exist");
  }
  const cart = await Cart.findOne({ email: user.email });
  if (!cart) {
    throw new Error("User doesn't have a cart");
  }
  const cartItemIndex = cart.cartItems.findIndex(
    (item) => item.product._id.toString() === productId
  );
  if (cartItemIndex === -1) {
    throw new Error("Product doesn't exist in your cart");
  }

  product.quantity = product.quantity + cart.cartItems[cartItemIndex].quantity;
  cart.cartItems.splice(cartItemIndex, 1);

  await product.save();
  return await cart.save();
};

module.exports = {
  getCartByUser,
  addProductToCart,
  updateProductInCart,
  deleteProductFromcart,
};
