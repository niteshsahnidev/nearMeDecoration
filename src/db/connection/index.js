const mongoose = require("mongoose")

require("dotenv").config()


try{
    console.log("DB URL ====> ",process.env.MONGODB_URL)
    if(process.env.MONGODB_URL){
        mongoose.connect(process.env.MONGODB_URL);
    }
} catch (err) {
    console.log("Database connection Error ====> ",err)
}

const conn =  mongoose.connection;


conn.on("connecting",()=>{
    console.log("Database Connecting...")
})

conn.on("connected",()=>{
    console.log("Database Connected Successfully")
})

conn.on("disconnected",()=>{
    console.log("Database Disconnected")
})