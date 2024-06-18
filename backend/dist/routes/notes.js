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
const express_validator_1 = require("express-validator");
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
router.get("/getTags", fetchuser_1.fetchUserId, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const notes = yield Notes_1.Notes.distinct("tag", { user: user });
        res.json({
            success: true,
            tags: notes,
        });
    }
    catch (error) {
        res.json({
            error: error.message,
            errorDetails: error,
        });
    }
}));
router.get("/getNotesWithTag/:tag", fetchuser_1.fetchUserId, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const tag = req.params.tag;
        const notes = yield Notes_1.Notes.find({
            user: user, tag: tag
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
router.post("/addNote", [
    (0, express_validator_1.body)("title", "Title cannot be empty. Minimum 5 character")
        .notEmpty()
        .isLength({
        min: 5,
    })
        .escape(),
    (0, express_validator_1.body)("description", "Description minimum 5 character")
        .notEmpty()
        .isLength({
        min: 5
    })
        .escape(),
    (0, express_validator_1.body)("tag").escape(),
], fetchuser_1.fetchUserId, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = (0, express_validator_1.validationResult)(req);
        if (!result.isEmpty()) {
            return res.json({
                success: false,
                error: result.array().map((e) => e.msg),
            });
        }
        const { title, tag, description } = req.body;
        const user = req.user;
        const note = yield Notes_1.Notes.create({
            user: user,
            title: title,
            description: description,
            tag: tag ? tag : "Default",
        });
        res.json({
            success: true,
            note: note
        });
    }
    catch (error) {
        res.json({
            success: false,
            error: error.message,
            errorDetails: error,
        });
    }
}));
router.put("/updatenote/:id", fetchuser_1.fetchUserId, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, tag } = req.body;
        const data = {};
        if (title)
            data.title = title;
        if (description)
            data.description = description;
        if (tag)
            data.tag = tag;
        const user = req.user;
        const id = req.params.id;
        const note = yield Notes_1.Notes.findById({
            _id: id
        });
        if (!note || note.user.toString() !== user) {
            throw new Error("Note not found!");
        }
        const newNote = yield Notes_1.Notes.findByIdAndUpdate({
            _id: id
        }, {
            $set: data
        }, {
            new: true
        });
        res.json({
            note: newNote,
        });
    }
    catch (error) {
        res.json({
            error: error.message,
            errorDetails: error,
        });
    }
}));
router.delete("/deletenote/:id", fetchuser_1.fetchUserId, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const id = req.params.id;
        const note = yield Notes_1.Notes.findById({
            _id: id
        });
        if (!note || note.user.toString() !== user) {
            throw new Error("Note not found!");
        }
        const result = yield Notes_1.Notes.findByIdAndDelete({ _id: id });
        res.json({
            res: result,
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