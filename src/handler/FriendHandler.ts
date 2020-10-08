import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { response } from "../common/response/Response";
import { connectToDatabase } from "../common/conncetion/Connection";
import { FriendModel } from "../model/FriendList/Model";


export const insertFriend: APIGatewayProxyHandler = async (event, _context) => {
    _context.callbackWaitsForEmptyEventLoop = false;
    const params = event.queryStringParameters
    
    try {
      await connectToDatabase();
      let users = await FriendModel.find({
        userId:{ $in:[
            params.toUser,
            params.fromUser
          ]
        }
      });

      if(users !== null){
        
      }

    } catch (e) {
      return response(500, {
        result: true,
        message: "server_err",
      });
    }
    return response(200, {
      result: true,
      message: "insert_complete",
    });
};