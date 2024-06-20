"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUserId = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_KEY = "MYSECRETKEY";
const fetchUserId = (req, res, next) => {
    try {
        const token = req.header("token");
        if (!token) {
            throw new Error("No token provided!");
        }
        const data = jsonwebtoken_1.default.verify(token, JWT_KEY);
        req.user = data.user;
        next();
    }
    catch (error) {
        res.json({
            error: "JsonWebTokenError",
            message: error.message === "jwt malformed" ? "Invalid Token" : error.message
        });
    }
};
exports.fetchUserId = fetchUserId;
//# sourceMappingURL=fetchuser.js.map