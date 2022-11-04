const mongoose = require("mongoose")

require("dotenv").config()


try {
    mongoose.connect(process.env.MONGODB_URL);

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