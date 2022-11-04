const mongoose = require("mongoose")

require("dotenv").config()


try {
    mongoose.connect("mongodb+srv://sakshi_events:WhlepNaD7kXlVYD3@cluster0.0ztqiyo.mongodb.net/sakshi_events?retryWrites=true&w=majority");
} catch (err) {
    console.log("Database connection Error ====> ", err)
}

const conn = mongoose.connection;


conn.on("connecting", () => {
    console.log("Database Connecting...")
})

conn.on("connected", () => {
    console.log("Database Connected Successfully")
})

conn.on("disconnected", () => {
    console.log("Database Disconnected")
})