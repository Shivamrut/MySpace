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
    body("email", "Enter valid email").exists().isEmail(),
    body("password", "Password cannot be blank").exists(),
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
            });
          } else {
            res.json({
              success: false,
              user: "Password Incorrect",
            });
          }
        } else {
          res.json({
            success: false,
            user: "User not found",
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
    body("username", "Username too short").isLength({ min: 3 }),
    body("email", "Enter valid email").isEmail(),
    body("password", "Password is too short").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
      let { username, email, password } = req.body;
      let user = await User.findOne({ email: email });
      if (user) {
        return res.status(400).json({
          success: true,
          error: "User email already exists",
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
          });
        })
        .catch((e) => {
          console.log("Error signing up: ", e);
          res.json({
            success: false,
            error: e.errorResponse.errmsg,
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
