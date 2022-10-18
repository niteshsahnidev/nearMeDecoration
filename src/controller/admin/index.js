const userCollection = require("../../db/model/user");
const brcypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const adminLoginController = async (req, res) => {
    try {
        if (req.body.email && req.body.password) {
            const user = await userCollection.findOne({ email: req.body.email })
            const verify = await brcypt.compare(req.body.password, user.password)
            console.log(verify)
            if (verify) {
                let token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY)
                res.status(200).json(
                    {
                        status: 200,
                        success: true,
                        name: user.name,
                        email: user.email,
                        token: token,
                    }
                )
            } else {
                res.status(400).json({
                    status: 400,
                    success: false,
                    message: "Invalid Credentials"
                })
            }
        } else {
            res.status(400).json({
                status: 400,
                success: false,
                message: "Invalid Credentials"
            })
        }
    } catch (err) {
        console.log("Admin Login ERROR ====> ",err)
        res.status(400).json({
            status: 400,
            success: false,
            message: "Invalid Credentials"
        })
    }
}


const adminChangePasswordController = async (req, res) => {
    try {
        if (req.body.email && req.body.newPassword && req.body.password) {
            const user = await userCollection.findOne({ email: req.body.email });
            const verify = await brcypt.compare(req.body.password, user.password);
            if (verify) {
                const hashedPassword = await brcypt.hash(req.body.newPassword, 10)
                const updatedUser = await userCollection.findOneAndUpdate({ email: req.body.email }, { password: hashedPassword })
                console.log(updatedUser);
                res.status(200).json({
                    status:200,
                    success:true,
                    message:"Password Changed Successfully"
                });
            } else {
                res.status(400).json({
                    status: 400,
                    success: false,
                    message: "Invalid Credentials"
                })
            }
        } else {
            res.status(400).json({
                status: 400,
                success: false,
                message: "Invalid Credentials"
            })
        }
    } catch (err) {
        console.log("Change Password Error ====> ",err)
        res.status(400).json({
            status: 400,
            success: false,
            message: "Invalid Credentials"
        })
    }
}



module.exports = {adminChangePasswordController,adminLoginController}