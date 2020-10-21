import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { response } from "../common/response/Response";
import { connectToDatabase } from "../common/conncetion/Connection";
import { WantedListModel } from '../model/WantList/Model';
import { FriendModel } from "../model/FriendList/Model";


export const getUserFriendInfoList: APIGatewayProxyHandler = async (event, _context) => {
    _context.callbackWaitsForEmptyEventLoop = false;
    const params = event.pathParameters.userId;
  
    try{
        await connectToDatabase();
        const freindList = await FriendModel.findOne(
            {userId:params},{"userId":0,"__v":0,"__id":0}
        ).exec();
        
        const wantedToList = await WantedListModel.find(
            {"from.userId":params, isConnected:false},{"_id":0,"userId":0,"pw":0,"__v":0,"from":0}
        ).exec();

        const wantedFromList = await WantedListModel.find(
            {"to.userId":params, isConnected:false},{"_id":0,"userId":0,"pw":0,"__v":0,"to":0}
        ).exec();

    
        return response(200, {
          result: true,
          data:{"friendList":freindList,"wantedToList":wantedToList,"wantedFromList":wantedFromList}
        });
      
    } catch (e) {
      return response(500, {
        result: false,
        message: "server_err",
      });
    }
  };