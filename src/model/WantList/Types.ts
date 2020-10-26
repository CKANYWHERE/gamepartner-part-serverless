import {Document,Model} from "mongoose"

export interface IWantedList{
    to:{
        userId:String,
        sex: String,
        age: Number,
        favoritGame: String,
        nickName:String,
        imgPath:String,
        introduce:String,
        liked:{
            type:Number,
            default:0
        }
    };
    from:{
        userId:String,
        sex: String,
        age: Number,
        favoritGame: String,
        nickName:String,
        imgPath:String,
        introduce:String,
        liked:{
            type:Number,
            default:0
        }
    };
    registerDate: String;
    isConnected: Boolean;
}

export interface IWantedListDocument extends IWantedList, Document {}

export interface IWantedListModel extends Model<IWantedListDocument> {}