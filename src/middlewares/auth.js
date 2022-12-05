const userCollection = require("../db/model/user")
const jwt = require("jsonwebtoken");
require("dotenv").config();

const adminAuth = async (req,res,next) => {
    try{
        console.log("logggggggggggggggg",JSON.stringify(req.cookies));
        const token = req.headers.authorization || req.query.authToken;
        if(token){
            const userId = jwt.verify(token,process.env.JWT_SECRET_KEY).id;
            const userType = await userCollection.findById(userId);
            if(userType.role === "admin"){
                return next();
            }
        }

            res.status(401).json({
                status:401,
                success:false,
                message:"You are not an authorized user"
            })
        
    } catch (err) {
        console.log("AUTH MIDDLEWARE ERROR ====> ",err.message)
        res.status(401).json({
            status:401,
            success:false,
            message:"You are not an authorized user"
        })
    }
}

const auth = async (req,res,next) => {
    try{
        const token = req.headers.authorization;
        if(token){
            const userId = jwt.verify(token,process.env.JWT_SECRET_KEY).id;
            const userType = await userCollection.findById(userId);
            if(userType.role === "admin"){
                return next();
            }
        }

            res.status(401).json({
                status:401,
                success:false,
                message:"You are not an authorized user"
            })
        
    } catch (err) {
        console.log("AUTH MIDDLEWARE ERROR ====> ",err.message)
        res.status(401).json({
            status:401,
            success:false,
            message:"You are not an authorized user"
        })
    }
}

module.exports = {auth,adminAuth}