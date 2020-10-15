import {Schema} from "mongoose";

const BoardSchema = new Schema({
    title: String,
    register:{
        userId:String,
        sex: String,
        age: Number,
        favoritGame: String,
        nickName:String,
        imgPath:String,
        liked:{
            type:Number,
            default:0
        },
    },
    registerDate: {
        type:Date,
    },
});

export default BoardSchema;
