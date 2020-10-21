import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { response } from "../common/response/Response";
import { connectToDatabase } from "../common/conncetion/Connection";
import { UserModel } from "../model/User/Model";
import { FriendModel } from '../model/FriendList/Model';
import { WantedListModel } from "../model/WantList/Model";
import * as querystring from "querystring";

export const insertFriend: APIGatewayProxyHandler = async (event, _context) => {
    _context.callbackWaitsForEmptyEventLoop = false;
    const params = querystring.parse(event.body);

    try {
      await connectToDatabase();
      let toUser = await UserModel.findOne({userId:params.toUser.toString()}
      , {"_id":0,"pw":0,"__v":0}).exec();
      
      let fromUser = await UserModel.findOne({userId:params.fromUser.toString()}
      , {"_id":0,"pw":0,"__v":0}).exec();

      let toUserParse = {
        "userId":toUser.userId,
        "sex":toUser.sex,
        "birthDay":toUser.birthDay,
        "age":toUser.age.toString(),
        "favoritGame":toUser.favoritGame,
        "nickName":toUser.nickName,
        "imgPath":toUser.imgPath,
      }

      let fromUserParse = {
        "userId":fromUser.userId,
        "sex":fromUser.sex,
        "birthDay":fromUser.birthDay,
        "age":fromUser.age.toString(),
        "favoritGame":fromUser.favoritGame,
        "nickName":fromUser.nickName,
        "imgPath":fromUser.imgPath,
      }

      if(toUser !== null && fromUser !== null){
        await FriendModel.findOneAndUpdate(
          {userId:params.toUser.toString()},
          { $push:{ friendList : fromUserParse }}
        );

        await FriendModel.findOneAndUpdate(
          {userId: params.fromUser.toString()},
          {$push:{ friendList : toUserParse }}
        );

        await WantedListModel.updateMany(
          {
            "from.userId": {$in: [
                params.fromUser.toString(),
                params.toUser.toString()
              ],
            },
            "to.userId": {$in: [
                params.toUser.toString(),
                params.fromUser.toString()
              ],
            },
          },
          {isConnected:true}
        );
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


export const getFriendList: APIGatewayProxyHandler = async (event, _context) => {
  _context.callbackWaitsForEmptyEventLoop = false;
  const params = event.pathParameters.userId;

  try{
    await connectToDatabase();
    const freindList = await FriendModel.findOne(
      {userId:params},{"userId":0,"__v":0,"__id":0}).exec();

    return response(200, {
      result: true,
      data: freindList
    });

  }catch(e){
    return response(500, {
      result: true,
      message:"failed"
    });
  }

 
}
