var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { signout, signup } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 5 })
      .withMessage("Name should be at least 5 characters"),
    check("email", "The entered email is not a valid format").isEmail(),
    check("password", "password should be at least 3 character").isLength({
      min: 3,
    }),
  ],
  signup
);
router.get("/signout", signout);

module.exports = router;
