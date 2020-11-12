import {Document,Model} from "mongoose"

export interface IBoard{
    title: String,
    register:{
        userId:String,
        sex: String,
        age: Number,
        favoritGame: String,
        nickName:String,
        imgPath:String,
    },
    clickCount:Number
    registerDate: String
}

export interface IBoardDocument extends IBoard, Document {}

export interface IBoardModel extends Model<IBoardDocument> {}