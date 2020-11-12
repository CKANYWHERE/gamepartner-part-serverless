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
        clickCount:Number
    },
    registerDate: String
});

export default BoardSchema;
