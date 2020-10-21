import {Schema} from "mongoose";

const WantListSchema = new Schema({
    to:{
        userId:String,
        sex: String,
        age: Number,
        favoritGame: String,
        nickName:String,
        imgPath:String,
        liked:{
            type:Number,
            default:0
        }
    },
    from:{
        userId:String,
        sex: String,
        age: Number,
        favoritGame: String,
        nickName:String,
        imgPath:String,
        liked:{
            type:Number,
            default:0
        }
    },
    registerDate:String,
    isConnected: {
       type:Boolean,
       default:false
    }
});

export default WantListSchema;