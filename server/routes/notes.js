const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { validationResult, body } = require("express-validator");

router.get("/getAllNotes", fetchuser, async (req, res) => {
  try {
    const user = req.user;
    const notes = await Notes.find({ user: user });
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

router.get("/getNoteById", (req, res) => {
  res.json({
    success: true,
    data: {
      id: 1,
      note: "xyz",
    },
  });
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
    body("description", "Description cannot be empty. Minimum 5 character")
      .notEmpty()
      .isLength({ min: 5 })
      .escape(),
    body("tag").escape(),
  ],
  fetchuser,
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.json({
          success: false,
          error: result.array().map((e) => e.msg),
        });
      }
      const { title, tag, description } = req.body;
      const user = req.user;
      const note = await Notes.create({
        user: user,
        title: title,
        description: description,
        tag: tag ? tag : "Default",
      });
      res.json({
        note: note,
      });
    } catch (error) {
      res.json({
        error: error.message,
        errorDetails: error,
      });
    }
  }
);

router.put("/updatenote/:id", fetchuser,async(req,res)=>{
    try {
        const {title,description,tag} = req.body
        const data = {}
        if(title)data.title = title 
        if(description)data.description = description
        if(tag)data.tag = tag 

        const user = req.user
        const id = req.params.id
        const note = await Notes.findById({_id:id})
        if(!note || note.user.toString()!==req.user){
            throw new Error("Note not found!")
        }
        const newNote = await Notes.findByIdAndUpdate({_id:id},{$set:data},{new:true})

        res.json({
            note : newNote
        })
        
    } catch (error) {
        res.json({
            error: error.message,
            errorDetails: error,
          });
    }
})

module.exports = router;
