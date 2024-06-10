const express = require("express")
const router = express.Router()
const Users = require("../models/Users")
router.post("/login",(req,res)=>{
    console.log(req.body)
    res.json({
        success : true,
        message : "Logged in"
    })
})

router.post("/signup",(req,res)=>{
    const user = Users(req.body)
    user.save()
    res.json({
        success : true
    })
})

module.exports = router