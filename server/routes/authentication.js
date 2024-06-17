const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { validationResult, body } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_KEY = "MYSECRETKEY";

router.post(
  "/login",
  [
    body("email")
      .notEmpty()
      .withMessage("Email cannot be blank")
      .isEmail()
      .withMessage("Invalid email format"),
    body("password")
      .notEmpty()
      .withMessage("Password cannot be blank"),
  ],
  async (req, res) => {

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.json({
        success: false,
        error: result.array().map((e) => e.msg),
      });
    }
    let { email, password } = req.body;

    User.findOne({ email: email })
      .then(async (user) => {
        if (user) {
          let hash = await bcrypt.compare(password, user.password);
          if (hash) {
            const data = {
              user: user._id,
            };
            const token = jwt.sign(data, JWT_KEY);
            res.json({
              success: true,
              token: token,
              username: user.username
            });
          } else {
            res.json({
              success: false,
              error: ["Password Incorrect"],
            });
          }
        } else {
          res.json({
            success: false,
            error: ["User not found"],
          });
        }
      })
      .catch((e) => {
        res.json({
          success: false,
          error: e,
        });
      });
  }
);

router.post(
  "/signup",
  [
    body("username")
      .isLength({ min: 3 })
      .withMessage("Username too short"),
    body("email")
      .isEmail()
      .withMessage("Enter valid email"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password is too short"),
  ],
  async (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
      let { username, email, password } = req.body;
      let user = await User.findOne({ email: email });
      if (user) {
        return res.json({
          success: false,
          error: ["User email already exists"],
        });
      }
      const hash = await bcrypt.hash(password, 10);
      User.create({
        username: username,
        email: email,
        password: hash,
      })
        .then((user) => {
          const data = {
            user: user._id,
          };
          const token = jwt.sign(data, JWT_KEY);
          res.json({
            success: true,
            token: token,
            username: user.username
          });
        })
        .catch((e) => {
          res.json({
            success: false,
            error: [e.errorResponse.errmsg],
          });
        });
    } else {
      res.json({
        success: false,
        error: result.array().map((e) => e.msg),
      });
    }
  }
);

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const id = req.user;
    const userData = await User.findOne({ _id: id }).select("-password");
    res.json({ user: userData });
  } catch (error) {
    res.json({ message: "Error fetching user data", error: error });
  }
});

module.exports = router;
