const decorationCollection = require("../../db/model/decoration")

const saveDecoration = async (req, res) => {
    try {
        if (req.body) {
            const newDecoration = new decorationCollection(req.body);
            const saved = await newDecoration.save();
            console.log("Saved Decoration ====> ", saved);
            res.status(200).json({
                status: 200,
                success: true,
                message: "Decoration Saved Successfully"
            });
        } else {
            res.status(400).json({
                status: 400,
                success: false,
                message: "Please fill all the fields."
            })
        }
    } catch (err) {
        console.log("Save Decoratioon Error ====> ", err)
        res.status(400).json({
            status: 400,
            success: false,
            message: "Something Went Wrong"
        })
    }
}

const updateDecoration = async (req, res) => {
    try {
        const id = req.params.id;
        const decoration = await decorationCollection.findByIdAndUpdate(id, req.body)
        res.status(200).json({
            status: 200,
            success: true,
            message: "Decoration Updated Successfully"
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            success: false,
            message: "Something Went Wrong"
        })
    }
}

const getDecoration = async (req, res) => {
    try {
        const id = req.params.id;
        const decoration = await decorationCollection.find({ _id: id });
        res.status(200).json(decoration);
    } catch (err) {
        res.status(400).json({
            status: 400,
            success: false,
            message: "Something Went Wrong"
        })
    }
}

const getDecorations = async (req, res) => {
    try {
        const type = req.params.type;
        switch (type) {
            case "birthday-decorations":
                const birthdayDecorations = await decorationCollection.find({ type: "birthday" });
                res.status(200).json(birthdayDecorations.reverse());
                break;
            case "kids-birthday-decorations":
                const kidsBirthdayDecorations = await decorationCollection.find({ type: "kids-birthday" });
                res.status(200).json(kidsBirthdayDecorations.reverse());
                break;
            case "anniversary-decorations":
                const anniversaryDecorations = await decorationCollection.find({ type: "anniversary" });
                res.status(200).json(anniversaryDecorations.reverse());
                break;
            case "baby-shower-decorations":
                const babyShowerDecorations = await decorationCollection.find({ type: "baby-shower" });
                res.status(200).json(babyShowerDecorations.reverse());
                break;
            case "wedding-decorations":
                const weddingDecorations = await decorationCollection.find({ type: "wedding" });
                res.status(200).json(weddingDecorations.reverse());
                break;
            case "new-year-decorations":
                const newYearDecorations = await decorationCollection.find({ type: "new-year" });
                res.status(200).json(newYearDecorations.reverse());
                break;
            case "valentine-decorations":
                const valentineDecorations = await decorationCollection.find({ type: "valentine" });
                res.status(200).json(valentineDecorations.reverse());
                break;
            case "purposal-decorations":
                const purposalDecorations = await decorationCollection.find({ type: "purposal" });
                res.status(200).json(purposalDecorations.reverse());
                break;
            case "party-decorations":
                const partyDecorations = await decorationCollection.find({ type: "party" });
                res.status(200).json(purposalDecorations.reverse());
                break;
            case "haldi-decorations":
                const haldiDecorations = await decorationCollection.find({ type: "haldi" });
                res.status(200).json(haldiDecorations.reverse());
                break;
            case "mehndi-decorations":
                const mehndiDecorations = await decorationCollection.find({ type: "mehndi" });
                res.status(200).json(mehndiDecorations.reverse());
                break;
            case "live-cartoon-character":
                const liveCartoonCharacter = await decorationCollection.find({ type: "live-cartoon-character" });
                res.status(200).json(liveCartoonCharacter.reverse());
                break;
            case "photo-video-shoot":
                const photoVideoShoot = await decorationCollection.find({ type: "photo-video-shoot" });
                res.status(200).json(photoVideoShoot.reverse());
                break;
            case "catering-decorations":
                const cateringDecorations = await decorationCollection.find({ type: "purposal" });
                res.status(200).json(cateringDecorations.reverse());
                break;
            case "game-corridor":
                const gameCorridor = await decorationCollection.find({ type: "game-corridor" });
                res.status(200).json(gameCorridor.reverse());
                break;
            case "music-system":
                const musicSystem = await decorationCollection.find({ type: "music-system" });
                res.status(200).json(musicSystem.reverse());
                break;
            case "other-decorations":
                const otherDecorations = await decorationCollection.find({ type: "others" });
                res.status(200).json(otherDecorations.reverse());
                break;
            default:
                res.status(404).json({
                    status: 404,
                    success: false,
                    msg: "Category Not Found"
                });
        }

    } catch (err) {
        console.log("GET Decorations Error ====> ", err)
        res.status(400).json({
            status: 400,
            success: false,
            message: "Something Went Wrong"
        })
    }
}

const deleteDecoration = async (req, res) => {
    try {
        const id = req.params.id;
        // idList.forEach(async (element) => {
        const deleted = await decorationCollection.findByIdAndDelete(id);
        // });
        res.status(200).json({
            status: 200,
            success: true,
            message: "Decoration Deleted Successfully"
        })
    } catch (err) {
        console.log("Decoration Delete Error ====> ", err.message)
        res.status(400).json({
            status: 400,
            success: false,
            message: "Something Went Wrong"
        })
    }
}


const getAllDecorations = async (req, res) => {
    try {
        const allDecoration = await decorationCollection.find();
        res.status(200).json({
            status: 200,
            success: true,
            data: allDecoration
        })

    } catch (err) {
        console.log("GET All Decorations Error ====> ", err)
        res.status(400).json({
            status: 400,
            success: false,
            message: "Something Went Wrong"
        })
    }
}


const decorationOverview = async (req, res) => {
    try {
        const birthdayDecorations = await decorationCollection.find({ type: "birthday" });
        const anniversaryDecorations = await decorationCollection.find({ type: "anniversary" });
        const babyShowerDecorations = await decorationCollection.find({ type: "baby-shower" });
        const banquetHallDecorations = await decorationCollection.find({ type: "banquet-hall" });
        const otherDecorations = await decorationCollection.find({ type: "others" });

        res.status(200).json({
            status: 200,
            success: true,
            data: {
                birthday: birthdayDecorations.length,
                anniversary: anniversaryDecorations.length,
                babyShower: babyShowerDecorations.length,
                banquetHall: banquetHallDecorations.length,
                others: otherDecorations.length
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 400,
            success: false,
            message: "Something Went Wrong"
        })
    }
}


module.exports = {
    getDecoration, getDecorations, saveDecoration, updateDecoration, deleteDecoration, decorationOverview, getAllDecorations
}