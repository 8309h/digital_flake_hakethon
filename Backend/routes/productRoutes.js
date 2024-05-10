const express = require('express');
const ProductRouter = express.Router();
const ProductModel = require('../models/productModel');
const CategoryModel = require('../models/categoryModel');

// Sample product category mapping
const productCategoryMapping = {
  'Amul Taaza': 'milk',
  'Mother Dairy': 'milk',
  'Nestle Everyday': 'milk',
  'Milk Vita': 'milk',
  'Dabur Real Fruit Juice': 'fruit',
  'Apple': 'fruit',
  'Banana': 'fruit',
  'Orange': 'fruit',
  'Mango': 'fruit',
  'Tomato': 'vegetable',
  'Carrot': 'vegetable',
  'Potato': 'vegetable',
  'Spinach': 'vegetable',
  'Broccoli': 'vegetable'
};

// Create Product Route
ProductRouter.post('/create', async (req, res) => {
  try {
    const {name, ...productData } = req.body;

    if (!name || !productCategoryMapping[name]) {
      return res.status(400).json({ message: 'Invalid product name or category not found' });
    }

    const categoryName = productCategoryMapping[name];
    let category = await CategoryModel.findOne({ name: categoryName });
    if (!category) {
      category = await CategoryModel.create({ name: categoryName });
    }

    const product = await ProductModel.create({ name, ...productData, category: category._id });

    res.status(201).json({ message: 'Product created successfully', data: product });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});


// Get All Products Route
ProductRouter.get('/getallproduct', async (req, res) => {
  try {
    const products = await ProductModel.find()
    res.status(200).json({ message: 'Products retrieved successfully', data: products });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// Get Product by ID Route
ProductRouter.get('/getbyId/:id', async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id).populate('category');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product retrieved successfully', data: product });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// Update Product Route
ProductRouter.patch('/update/:id', async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully', data: product });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// Delete Product Route
ProductRouter.delete('/delete/:id', async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

module.exports = ProductRouter;
