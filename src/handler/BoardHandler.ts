import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { response } from "../common/response/Response";
import { connectToDatabase } from "../common/conncetion/Connection";
import { UserModel } from "../model/User/Model";
import { BoardModel } from "../model/BoardList/Model";
import * as querystring from "querystring";


export const insertUser: APIGatewayProxyHandler = async (event, _context) => {
    _context.callbackWaitsForEmptyEventLoop = false;
    const params = querystring.parse(event.body);
    try {

      await connectToDatabase();

      const user = await UserModel.findOne(
        {userId:params.userId.toString()}
      );

      if(user.coin == 0){
        return response(200, {
          result: true,
          message: "no coin",
        });
      }else{

        const newBoard = new BoardModel({
          title:params.title,
          register:{
              userId:params.userId,
              sex: params.sex,
              age: params.age,
              favoritGame: params.favoritGame,
              nickName:params.nickName,
              imgPath:params.imgPath,
              liked:params.liked
          },
        });   

        await newBoard.save();
        await UserModel.updateOne(
          {userId:user.userId},
          {$set:{coin:user.coin - 1}}
        );
        return response(200, {
          result: true,
          message: "insert_complete",
        });
      }


    } catch (e) {
      
      return response(500, {
        result: true,
        message: "server_err",
      });
    }
  };