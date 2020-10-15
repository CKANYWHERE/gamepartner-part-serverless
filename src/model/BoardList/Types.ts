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
        liked:{
            type:Number,
            default:0
        },
    },
    registerDate: Date
}

export interface IBoardDocument extends IBoard, Document {}

export interface IBoardModel extends Model<IBoardDocument> {}