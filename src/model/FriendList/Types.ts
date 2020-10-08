import {Document,Model} from "mongoose"

export interface IFriend{
    userId: String,
    friendList:[{
        userId:String,
        sex:String,
        birthDay:String,
        age:String,
        favoritGame:String,
        nickName:String,
        imgPath:String
    }]
}

export interface IFriendDocument extends IFriend, Document {}

export interface IFriendModel extends Model<IFriendDocument> {}