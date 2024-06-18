import express, {  Response, Router } from "express"

import { INotes, Notes } from "../models/Notes"

import { fetchUserId, CustomRequest } from "../middleware/fetchuser"

import { validationResult, body, Result, ValidationError } from "express-validator"

const router: Router = express.Router()

router.get("/getAllNotes", fetchUserId, async (req: CustomRequest, res: Response) : Promise<void> =>  {
    try {
        const user: string = req.user;
        if (!user) {
            res.status(400).json({ success: false, message: 'User not authenticated' });
            return;
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

router.get("/getTags", fetchUserId, async (req: CustomRequest, res: Response) : Promise<void>=> {
    try {
        const user: string = req.user
        const notes: string[] = await Notes.distinct("tag", { user: user })
        res.json({
            success: true,
            tags: notes,
        });
    } catch (error) {
        res.json({
            error: error.message,
            errorDetails: error,
        });
    }
}
)

router.get("/getNotesWithTag/:tag", fetchUserId, async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const user: string = req.user;
        const tag = req.params.tag
        const notes: INotes[] = await Notes.find({
            user: user, tag: tag
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

router.post(
    "/addNote",
    [
        body("title", "Title cannot be empty. Minimum 5 character")
            .notEmpty()
            .isLength({
                min: 5,
            })
            .escape(),
        body("description", "Description minimum 5 character")
            .notEmpty()
            .isLength({
                min: 5
            })
            .escape(),
        body("tag").escape(),
    ],
    fetchUserId,
    async (req: CustomRequest, res: Response): Promise<void> => {
        try {
            const result: Result<ValidationError> = validationResult(req);
            if (!result.isEmpty()) {
                res.json({
                    success: false,
                    error: result.array().map((e) => e.msg),
                });
                return
            }
            const {
                title,
                tag,
                description
            } = req.body;
            const user: string = req.user;
            const note: INotes = await Notes.create({
                user: user,
                title: title,
                description: description,
                tag: tag ? tag : "Default",
            });
            res.json({
                success: true,
                note: note
            });
        } catch (error) {
            res.json({
                success: false,
                error: error.message,
                errorDetails: error,
            });
        }
    }
);


router.put("/updatenote/:id", fetchUserId, async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const {
            title,
            description,
            tag
        } = req.body;
        const data: Partial<INotes> = {}

        if (title) data.title = title;
        if (description) data.description = description;
        if (tag) data.tag = tag;

        const user : string = req.user;
        const id : string = req.params.id;
        const note : INotes | null = await Notes.findById({
            _id: id
        });
        if (!note || note.user.toString() !== user) {
            throw new Error("Note not found!");
        }
        const newNote : INotes | null = await Notes.findByIdAndUpdate({
            _id: id
        }, {
            $set: data
        }, {
            new: true
        });

        res.json({
            note: newNote,
        });
    } catch (error) {
        res.json({
            error: error.message,
            errorDetails: error,
        });
    }
});

router.delete("/deletenote/:id", fetchUserId, async (req : CustomRequest, res: Response) => {
    try {
  
      const user : string = req.user;
      const id : string = req.params.id;
      const note : INotes = await Notes.findById({
        _id: id
      });
      if (!note || note.user.toString() !== user) {
        throw new Error("Note not found!");
      }
      const result : INotes = await Notes.findByIdAndDelete({ _id: id })
      res.json({
        res: result,
      });
    } catch (error) {
      res.json({
        error: error.message,
        errorDetails: error,
      });
    }
  });

export default router
