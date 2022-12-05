const mongoose = require("mongoose")

const reviewSchema = mongoose.Schema({
    name:String,
    mobile:String,
    email:String,
    review:String,
    rating:Number,
    decorationId:String
})

module.exports = mongoose.model("review",reviewSchema)