const Listing = require("./models/listing");
const Review = require("./models/review");
module.exports.isLoggedIn = (req,res,next)=>{
    console.log(req.user)
    if(!req.isAuthenticated()){
        req.flash("error","you must be logged in to perform this action")
        return res.redirect("/login")
    }
    next()
}
module.exports.isOwner = async(req,res,next)=>{
    let {id}=req.params
    let listing=await Listing.findById(id)
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("success","you are not owner of this listing")
        return res.redirect(`/listings/${id}`)
      }
      next()
}
module.exports.isAuthor = async(req,res,next)=>{
    let {id, reviewId}=req.params
    let review =await Review.findById(reviewId)
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","you are not author of this review")
        return res.redirect(`/listings/${id}`)
      }
      next()
}