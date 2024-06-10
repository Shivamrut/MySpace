const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { validationResult, body } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_KEY = "MYSECRETKEY";

router.post("/login", async (req, res) => {
  let { username, password } = req.body;

  User.findOne({ username: username })
    .then(async (user) => {
      if (user) {
        let hash = await bcrypt.compare(password, user.password);
        if (hash) {
          res.json({
            success: true,
            user: user._id,
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
});

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
          const token = jwt.sign(data,JWT_KEY)
          console.log(token);
          res.json({
            success: true,
            token : token
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

module.exports = router;
