const {
  getCartByUser,
  addProductToCart,
  updateProductInCart,
  deleteProductFromcart,
  totalPriceSummary,
  paymentMethod,
} = require("../services/cart");
const {
  checkouts,
  orderedItems,
  getOrderItemsById,
} = require("../services/checkout");

const getCart = async (req, res) => {
  try {
    const cart = await getCartByUser(req.user); //req.body has replaced with req.user after auth
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const addProduct = async (req, res) => {
  try {
    const cart = await addProductToCart(
      req.user,
      req.body.productId,
      req.body.quantity
    ); //req.body has replaced with req.user after auth
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateOrDeleteProduct = async (req, res) => {
  try {
    if (req.body.quantity > 0) {
      const cart = await updateProductInCart(
        req.user,
        req.body.productId,
        req.body.quantity
      ); //req.body has replaced with req.user after auth
      res.status(200).json(cart);
    } else {
      const cart = await deleteProductFromcart(req.user, req.body.productId); //req.body has replaced with req.user after auth
      res.status(204).json(cart);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const totalPrice = async (req, res) => {
  try {
    const cart = await totalPriceSummary(req.user, req.body.total);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const paymentOptions = async (req, res) => {
  try {
    const cart = await paymentMethod(req.user, req.body.paymentOptions);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const checkout = async (req, res) => {
  try {
    await checkouts(req.user);
    res.status(204).json();
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const orders = async (req, res) => {
  try {
    const data = await orderedItems(req.user);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getOrderItems = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await getOrderItemsById(req.user, id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  getCart,
  addProduct,
  updateOrDeleteProduct,
  checkout,
  totalPrice,
  paymentOptions,
  orders,
  getOrderItems,
};
