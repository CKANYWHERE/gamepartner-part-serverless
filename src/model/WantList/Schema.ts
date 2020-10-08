import {Schema} from "mongoose";

const WantListSchema = new Schema({
    to:String,
    from:String,
    registerDate: {
        type:Date,
        default:Date.now
    },
    isConnected: {
       type:Boolean,
       default:false
    }
});

export default WantListSchema;