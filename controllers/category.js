const Category = require("../models/category");

//middleware
exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((error, category) => {
    if (error) {
      return res.status(400).json({
        error: "Category not found in DB",
      });
    }
    req.category = category;
    next();
  });
};

//actual controllers
exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((error, category) => {
    if (error) {
      return res.status(400).json({
        error: "Coudnot add category to DB",
      });
    }
    res.status(200).json(category);
  });
};
exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategories = (req, res) => {
  Category.find().exec((error, categories) => {
    if (error) {
      return res.status(400).json({
        error: "No categories found",
      });
    }
    res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((error, updatedCategory) => {
    if (error) {
      res.status(400).json({
        error: "Failed to update category",
      });
    }
    res.json(updatedCategory);
  });
};

exports.removeCategory = (req, res) => {
  const category = req.category;
  category.remove((error, category) => {
    if (error) {
      return res.status(400).json({
        error: "Failed to delete category",
      });
    }
    res.json({
      message: req.category.name + "Successfully deleted",
    });
  });
};
