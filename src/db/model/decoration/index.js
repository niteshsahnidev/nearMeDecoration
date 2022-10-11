const mongoose = require("mongoose")

const decorationSchema = mongoose.Schema({
    // _id:mongoose.Schema.Types.ObjectId,
    title:String,
    price:String,
    image:String,
    offerings:Array,
    discount:Number,
    likes:Number,
    type:String
})

module.exports = mongoose.model("decoration",decorationSchema)