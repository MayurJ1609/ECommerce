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
