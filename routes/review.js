const express = require("express")
const router = express.Router({mergeParams:true})
const ExpressError = require("../utils/ExpressError.js")
const wrapAsync = require("../utils/wrapAsync.js") ;
const Listing = require("../models/listing");
const Review = require("../models/review");
const{isLoggedIn,isAuthor} = require("../middleware.js")
router.post("/",isLoggedIn,wrapAsync(async (req,res)=>{
    let {id}=req.params
    let listing = await Listing.findById(id)
    
    let newReview = new Review(req.body.review)
    newReview.author = req.user._id

    listing.reviews.push(newReview)
    await newReview.save()
    await listing.save()

return res.redirect(`/listings/${id}`); 
}))
router.delete("/:reviewId",isLoggedIn,isAuthor,wrapAsync(async(req,res)=>{
    let{id,reviewId}=req.params
    await Listing.findByIdAndUpdate(id,{$pull:{reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId)
    res.redirect(`/listings/${id}`)
}))
module.exports=router