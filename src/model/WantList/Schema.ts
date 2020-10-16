import {Schema} from "mongoose";

const WantListSchema = new Schema({
    to:String,
    from:String,
    registerDate:String,
    isConnected: {
       type:Boolean,
       default:false
    }
});

export default WantListSchema;