const express = require("express");
const { body } = require("express-validator");
const { register, login, getMe } = require("../controllers/authController");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/register", [
  body("name").notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 6 })
], register);

router.post("/login", login);
router.get("/me", auth, getMe);

module.exports = router;
