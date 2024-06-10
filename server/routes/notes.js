const express = require("express")
const router = express.Router()

router.get("/getAllNotes",(req,res)=>{
    res.json({
        success : true,
        notes : []
    })
})

router.get("/getNoteById",(req,res)=>{
    res.json({
        success : true,
        data : {
            id : 1,
            note : "xyz"
        }
    })
})

module.exports = router