import {Schema} from "mongoose";

const UserSchema = new Schema({
    userId: {
        type:String,
        unique:true
    },
    pw: String,
    sex: String,
    age: Number,
    birthDay: String,
    favoritGame: String,
    introduce: String,
    nickName:String,
    imgPath:String,

});

export default UserSchema;