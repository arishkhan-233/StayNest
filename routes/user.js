const express = require("express")
const router = express.Router({mergeParams:true})
const User = require("../models/user");
const passport = require("passport");
router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs")
})
router.post("/signup",async(req,res)=>{
    let{username,email,password }=req.body
    const newUser =new User({username,email})
    const registeredUser =await User.register(newUser , password)
    console.log(registeredUser)
    req.login(registeredUser,(err)=>{
        if(err){
           return  next(err)
        }
        req.flash("success","wellcome to wanderlust")
    res.redirect("/listings")
      })
})
router.get("/login",(req,res)=>{
    res.render("users/login.ejs")
})
router.post("/login",passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash:true,
}),
async (req,res)=>{
    req.flash("success","logged in succefully!")
    res.redirect("/listings") 

})
router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err)
        }
        req.flash("success","you logged out successfully")
        res.redirect("/listings")
    })
})
module.exports=router