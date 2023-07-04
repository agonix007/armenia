const {
  getCartByUser,
  addProductToCart,
  updateProductInCart,
  deleteProductFromcart,
} = require("../services/cart");

const getCart = async (req, res) => {
  try {
    const cart = await getCartByUser(req.body); //req.body will replaced with req.user after auth
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addProduct = async (req, res) => {
  try {
    const cart = await addProductToCart(
      req.body,
      req.body.productId,
      req.body.quantity
    ); //req.body will replaced with req.user
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateOrDeleteProduct = async (req, res) => {
  try {
    if (req.body.quantity > 0) {
      const cart = await updateProductInCart(
        req.body,
        req.body.productId,
        req.body.quantity
      ); //req.body will replaced with req.user
      res.status(200).json(cart);
    } else {
      const cart = await deleteProductFromcart(req.body, req.body.productId); //req.body will replaced with req.user
      res.status(204).json(cart);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getCart,
  addProduct,
  updateOrDeleteProduct,
};
