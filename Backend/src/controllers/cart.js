const {
  getCartByUser,
  addProductToCart,
  updateProductInCart,
  deleteProductFromcart,
} = require("../services/cart");

const getCart = async (req, res) => {
  try {
    const cart = await getCartByUser(req.user); //req.body has replaced with req.user after auth
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).send(error.message);
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
    res.status(500).send(error.message);
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
    res.status(500).send(error.message);
  }
};

const checkout = async (req, res) => {
  try {
  
  } catch (error) {
    
  }
};

module.exports = {
  getCart,
  addProduct,
  updateOrDeleteProduct,
  checkout
};
