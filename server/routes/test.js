const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const Users = require("../models/Users")

router.get("/users",async (req,res)=>   {
    try {
        const users = await Users.find({});
        res.json({
            users : users
        })
        
    } catch (error) {
        res.json({
            error: error.message,
            errorDetails: error,
          });
        
    }
})

module.exports = router