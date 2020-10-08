import {Schema} from "mongoose";

const FriendSchema = new Schema({
    userId: {
        type:String,
        unique:true
    },
    friendList:[{
        userId:String,
        sex:String,
        birthDay:String,
        age:String,
        favoritGame:String,
        nickName:String,
        imgPath:String
    }]
});

export default FriendSchema;
