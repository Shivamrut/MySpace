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
const router = express_1.default.Router();
const Notes_1 = require("../models/Notes");
const fetchuser_1 = require("../middleware/fetchuser");
router.get("/getAllNotes", fetchuser_1.fetchUserId, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not authenticated' });
        }
        const notes = yield Notes_1.Notes.find({
            user: user
        });
        res.json({
            success: true,
            notes: notes,
        });
    }
    catch (error) {
        res.json({
            error: error.message,
            errorDetails: error,
        });
    }
}));
exports.default = router;
//# sourceMappingURL=notes.js.map