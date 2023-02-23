const express = require("express");
const { adminLoginController, adminChangePasswordController, tokenVerifyController } = require("../../controller/admin");
const { saveDecoration, updateDecoration, deleteDecoration, getDecoration, getDecorations, decorationOverview, getAllDecorations } = require("../../controller/decoration");
const { deletedReview } = require("../../controller/review");
const { birthday } = require("../../db/model/decoration");
const { auth, adminAuth } = require("../../middlewares/auth");
const cloudinary = require("cloudinary").v2
require("dotenv").config()

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });


const router = express.Router();

router.post("/login",adminLoginController)
router.post("/verifyToken",tokenVerifyController)
router.put("/change-password",adminChangePasswordController)
router.get("/overview",adminAuth,decorationOverview)
router.post("/decoration",adminAuth,saveDecoration)
router.put("/decoration",adminAuth,updateDecoration)
router.delete("/decoration/:id",adminAuth,deleteDecoration)
router.get("/decorations",adminAuth,getAllDecorations)
router.delete("/delete-review/:id",adminAuth,deletedReview);

router.post("/uploadImage",adminAuth,async(req,res)=>{
    try{
        // console.log(req.files.image.tempFilePath,'h-0-vzTmCTqekkUYxq_huWyIgGA','db8j2iqgc','h-0-vzTmCTqekkUYxq_huWyIgGA')
        await cloudinary.uploader.upload(req.files.image.tempFilePath,{},(err,result)=>{
            console.log("Image Upload Error ===> ",err)
            if(!err){
                res.status(200).json({
                    status:200,
                    success:true,
                    imgUrl:result.url,
                    secretImgUrl:result.secure_url,
                    format:result.format
                })
            } else {
                res.status(500).json({
                    status:500,
                    success:false,
                    message:"Something went wrong in uploading image"
                })
            }
        })
    } catch (err) {
        console.log("Image upload Error ====> ",err)
        res.status(500).json({
            status:500,
            success:false,
            message:"Something went wrong in uploading image"
        })
    }
})


module.exports = router;