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
      console.log("Error : " + error);
      return res.status(400).json({
        error: "No categories found",
      });
    }
    res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  const category = new Category(req.body);
  console.log(
    "Category : " +
      category +
      " | Category Id : " +
      category._id +
      " | req : " +
      JSON.stringify(req.body) +
      " | req id : " +
      JSON.stringify(req.category._id)
  );

  Category.findByIdAndUpdate(
    { _id: req.category._id },
    { $set: req.body },
    {
      new: true,
      useFindAndModify: false,
    },
    (error, cat) => {
      if (error) {
        console.log("In error of update " + error);
        return res.status(400).json({
          error: "Not updated",
        });
      }
      console.log("Category after updating : " + cat);
      return res.status(200).json(cat);
    }
  );
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
