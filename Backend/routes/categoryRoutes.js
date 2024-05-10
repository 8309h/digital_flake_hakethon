const express = require("express");
const CategoryModel = require("../models/categoryModel");

const CategoryRouter = express.Router();

CategoryRouter.get("/getall", async (req, res) => {
  try {
    const category = await CategoryModel.find();
    res.status(201).json({ category: category });
  } catch (err) {
    console.error("Error while getting category:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

CategoryRouter.post("/addnew", async (req, res) => {
    try {
      const { id, name, description, status } = req.body;
  
      const categoryExists = await CategoryModel.findOne({ name: name });
  
      if (categoryExists) {
        return res.status(400).json({ message: "Category already exists" });
      }
  
      const newCategory = new CategoryModel({
        id,
        name,
        description,
        status,
      });
  
      await newCategory.save();
      res.status(201).json({ message:"New Category Added succesfully", category: newCategory });
    } catch (err) {
      console.error("Error while creating category:", err.message);
      res.status(500).json({ message: "Internal server error" });
    }
  });


  CategoryRouter.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deleteByID = await CategoryModel.findByIdAndDelete(id);

        if (!deleteByID) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category deleted successfully" });
    } catch (err) {
        console.error("Error while deleting category:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
});



CategoryRouter.patch('/update/:id', async (req, res) => {
  const categoryId = req.params.id;
  const { id, name, description, status } = req.body; 

  try {
    const updatedCategory = await CategoryModel.findByIdAndUpdate(categoryId, { id, name, description, status }, { new: true });

    if (!updatedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(200).json(updatedCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// route for search by name


CategoryRouter.get('/search', async (req, res) => {
  const { name } = req.query;

  try {
    const categories = await CategoryModel.find({ name: { $regex: new RegExp(name, 'i') } });

    if (categories.length === 0) {
      return res.status(404).json({ error: 'No categories found matching the search criteria' });
    }

    res.status(200).json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





module.exports = CategoryRouter;