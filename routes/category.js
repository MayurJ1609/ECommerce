const express = require("express");
const router = express.Router();
const { getCategoryById } = require("../controllers/category");
const { isAuthenticated, isSignedIn, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//actual routes

module.exports = router;
