import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { response } from "../common/response/Response";
import { connectToDatabase } from "../common/conncetion/Connection";
import { BoardModel } from "../model/BoardList/Model";
import * as querystring from "querystring";


export const insertUser: APIGatewayProxyHandler = async (event, _context) => {
    _context.callbackWaitsForEmptyEventLoop = false;
    const params = querystring.parse(event.body);
    try {
      const newBoard = new BoardModel({
        title:params.title,
        register:{
            userId:params.userid,
            sex: params.sex,
            age: params.age,
            favoritGame: params.favoritGame,
            nickName:params.nickName,
            imgPath:params.imgPath,
            liked:params.liked
        },
      });
  
      await connectToDatabase();
      await newBoard.save();
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