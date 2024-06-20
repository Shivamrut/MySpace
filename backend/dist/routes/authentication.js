"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Users_1 = require("../models/Users");
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_KEY = "MYSECRETKEY";
const router = express_1.default.Router();
router.post("/login", [
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("Email cannot be blank")
        .isEmail()
        .withMessage("Invalid email format"),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("Password cannot be blank"),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        res.json({
            success: false,
            error: result.array().map((e) => e.msg),
        });
        return;
    }
    let { email, password } = req.body;
    Users_1.User.findOne({ email: email })
        .then((user) => __awaiter(void 0, void 0, void 0, function* () {
        if (user) {
            let hash = yield bcrypt_1.default.compare(password, user.password);
            if (hash) {
                const data = {
                    user: user._id,
                };
                const token = jsonwebtoken_1.default.sign(data, JWT_KEY);
                res.json({
                    success: true,
                    token: token,
                    username: user.username
                });
            }
            else {
                res.json({
                    success: false,
                    error: ["Password Incorrect"],
                });
            }
        }
        else {
            res.json({
                success: false,
                error: ["User not found"],
            });
        }
    }))
        .catch((e) => {
        res.json({
            success: false,
            error: e,
        });
    });
}));
router.post("/signup", [
    (0, express_validator_1.body)("username")
        .isLength({ min: 3 })
        .withMessage("Username too short"),
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Enter valid email"),
    (0, express_validator_1.body)("password")
        .isLength({ min: 5 })
        .withMessage("Password is too short"),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, express_validator_1.validationResult)(req);
    if (result.isEmpty()) {
        let { username, email, password } = req.body;
        let user = yield Users_1.User.findOne({ email: email });
        if (user) {
            res.json({
                success: false,
                error: ["User email already exists"],
            });
            return;
        }
        const hash = yield bcrypt_1.default.hash(password, 10);
        Users_1.User.create({
            username: username,
            email: email,
            password: hash,
        })
            .then((user) => {
            const data = {
                user: user._id,
            };
            const token = jsonwebtoken_1.default.sign(data, JWT_KEY);
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
    }
    else {
        res.json({
            success: false,
            error: result.array().map((e) => e.msg),
        });
    }
}));
exports.default = router;
//# sourceMappingURL=authentication.js.map