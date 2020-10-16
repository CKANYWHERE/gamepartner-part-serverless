import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { response } from "../common/response/Response";
import { connectToDatabase } from "../common/conncetion/Connection";
import { UserModel } from "../model/User/Model";
import { BoardModel } from "../model/BoardList/Model";
import * as querystring from "querystring";

export const insertBoard: APIGatewayProxyHandler = async (event, _context) => {
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
              liked:params.liked,
          },
          registerDate:params.registerDate
        });   

        await newBoard.save();
        await UserModel.updateOne(
          {userId:user.userId},
          {$set:{coin:user.coin - 1}}
        ).exec();
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

  
export const getBoardList: APIGatewayProxyHandler = async (_, _context) => {
  _context.callbackWaitsForEmptyEventLoop = false;

  try{
    await connectToDatabase();
    const boardList = await BoardModel.find().sort({registerDate:-1}).limit(50).exec();
    
    return response(200, {
      result: true,
      data: boardList
    });

  }catch(e){
    return response(500, {
      result: true,
      message:"failed"
    });
  }
 
}
