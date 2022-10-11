const express = require("express");
require("./db/connection/index");
const adminRouter = require("./router/admin")
const fileUpload  = require("express-fileupload")
const bodyParser = require("body-parser");
const { getDecorations, getDecoration } = require("./controller/decoration");
const { adminAuth } = require("./middlewares/auth");

const app = express()
const port = process.env.PORT || 8081


app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use(fileUpload({
    useTempFiles:true
}))

app.use("/admin",adminRouter);
app.get("/decorations/:type",getDecorations)
app.get("/decoration/:id",getDecoration)

app.listen(port,()=>{
    console.log(`Server is listening at http://localhost:${port}`)
});