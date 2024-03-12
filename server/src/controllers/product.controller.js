const Product = require('../models/product.model');

const getProducts = async (req, res) => {
  try {
    console.log('SERVER: Get Request!');

    const products = await Product.find({});
    res.status(200).send(products);

  } catch (error) {
    res.status(500).send({message: error.message});
  };
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`SERVER: Get Request for id: ${id}`);

    const product = await Product.findById(id);
    if (!product) {
      res.status(404).send({message: 'Product not found!'});
      return;
    }
    res.status(200).send(product);

  } catch (error) {
    res.status(500).send({message: error.message});
  };
};

const createProduct = async (req, res) => {
  try {
    console.log('SERVER: Post Request!');

    const product = await Product.create(req.body);
    res.status(200).send(product);

  } catch (error) {
    res.status(500).send({message: error.message});
  };
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`SERVER: Put Request for id: ${id}`);

    const product = await Product.findByIdAndUpdate(id,req.body,);

    if (!product) {
      res.status(404).json({message: 'Product not found!'});
      return;
    };

    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).send({message: error.message});
  };
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`SERVER: Delete Request for id: ${id}`);

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      res.status(404).json({message: 'Product not found!'});
      return;
    };
    res.status(200).json({message: 'Product deleted!', deleted: {product}});
  } catch (error) {
    res.status(500).send({message: error.message});
  };
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};