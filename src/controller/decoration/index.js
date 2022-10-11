const _ = require("lodash")
const decorationCollection = require("../../db/model/decoration")

const saveDecoration = async (req,res) => {
    try{
       if(req.body){
            const newDecoration = new decorationCollection(req.body);
            const saved = await newDecoration.save();
            console.log("Saved Decoration ====> ",saved);
            res.status(200).json({
                status:200,
                success:true,
                message:"Decoration Saved Successfully"
            });
       }else{
        res.status(400).json({
            status:400,
            success:false,
            message:"Please fill all the fields."
        })
       }
    } catch (err) {
        console.log("Save Decoratioon Error ====> ",err)
        res.status(400).json({
            status:400,
            success:false,
            message:"Somthing Went Wrong"
        })
    }
}

const updateDecoration = async (req,res) => {
    try{
        const id = req.params.id;
        const decoration = await decorationCollection.findByIdAndUpdate(id,req.body)
        res.status(200).json({
            status:200,
            success:true,
            message:"Decoration Updated Successfully"
        });
    } catch (err) {
        res.status(400).json({
            status:400,
            success:false,
            message:"Somthing Went Wrong"
        })
    }
}

const getDecoration = async (req,res) => {
    try{
        const id = req.params.id;
        const decoration = await decorationCollection.find({_id:id});
        res.status(200).json(decoration);
    } catch (err) {
        res.status(400).json({
            status:400,
            success:false,
            message:"Somthing Went Wrong"
        })
    }
}

const getDecorations = async (req,res) => {
    try{
        const type = req.params.type;
         switch(type){
            case "birthday-decorations":
                const birthdayDecorations = await decorationCollection.find({type:"birthday"});
                res.status(200).json(birthdayDecorations);
                break;
            case "anniversary-decorations":
                const anniversaryDecorations = await decorationCollection.find({type:"anniversary"});
                res.status(200).json(anniversaryDecorations);
                break;
            case "baby-shower":
                const BabyShowerDecorations = await decorationCollection.find({type:"baby-shower"});
                res.status(200).json(BabyShowerDecorations);
                break;
            case "others":
                const otherDecorations = await decorationCollection.find({type:"others"});
                res.status(200).json(other);
                break;
         }
        
    } catch (err) {
        console.log("GET Decorations Error ====> ",err)
        res.status(400).json({
            status:400,
            success:false,
            message:"Somthing Went Wrong"
        })
    }
}

const deleteDecoration = async (req,res) => {
    try{
        const idList = req.body.idList;
        idList.forEach(async (element) => {
            await decorationCollection.findByIdAndDelete(element);
        });
        res.status(200).json({
            status:200,
            success:true,
            message:"Decoration Deleted Successfully"
        })
    } catch (err) {
        res.status(400).json({
            status:400,
            success:false,
            message:"Somthing Went Wrong"
        })
    }
}


module.exports = {
    getDecoration,getDecorations,saveDecoration,updateDecoration,deleteDecoration
}