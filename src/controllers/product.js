const {Product} = require("../models/product");

const getProducts = async (req,res) => {
  try {
    const products = await Product.find({});
    if (products.length === 0) {
      throw new Error("There are no products in database.");
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getProductsById = async (req,res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      throw new Error("Product not found");
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const addProducts = async (req,res) => {
  try {
    const newProduct = await new Product(req.body)
    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

module.exports = { getProducts, getProductsById, addProducts };
