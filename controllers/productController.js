const Product = require('../models/productModel');


const createProduct = async (req, res) => {
    try {
      const { name, description, price, image } = req.body;
      const product = await Product.create({ name, description, price, image });
      res.status(201).json({ message: 'Product created successfully', product });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

const getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      if (!products) {
        return res.status(404).json({ message: 'No products found' });
      }
      res.status(200).json({ products });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  const updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, price, image } = req.body;
      const product = await Product.findByIdAndUpdate(id, { name, description, price, image }, { new: true });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ message: 'Product updated successfully', product });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  const deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ message: 'Product deleted successfully', product });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

const getProductById =async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ product });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  const getProductByName = async (req, res) => {
    try {
      const { name } = req.params;
      const product = await Product.find({ name });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ product });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  const getProductByPrice = async (req, res) => {
    try {
      const { productName, price } = req.params;
      const product = await Product.find({ name: productName, price: price });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ product });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductByName,
    getProductByPrice
};