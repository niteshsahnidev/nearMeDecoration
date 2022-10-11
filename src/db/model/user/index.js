const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    email:String,
    password:String,
    role:String
})

module.exports = mongoose.model("user",userSchema);