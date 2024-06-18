import express, { Request, Response, Router } from "express"

const router: Router = express.Router()

import { Notes } from "../models/Notes"

import { fetchUserId } from "../middleware/fetchuser"

import { validationResult, body } from "express-validator"

interface CustomRequest extends Request {
    user?: string
}

router.get("/getAllNotes",fetchUserId ,async (req: CustomRequest, res: Response) => {
    try {
        const user: string = req.user;
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not authenticated' });
        }
        const notes = await Notes.find({
            user: user
        });
        res.json({
            success: true,
            notes: notes,
        });
    } catch (error) {
        res.json({
            error: error.message,
            errorDetails: error,
        });
    }
});

export default router
