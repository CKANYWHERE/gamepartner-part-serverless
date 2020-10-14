import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { response } from "../common/response/Response";
import { connectToDatabase } from "../common/conncetion/Connection";
import { UserModel } from "../model/User/Model";
import { FriendModel } from "../model/FriendList/Model";
import * as querystring from "querystring";


export const insertUser: APIGatewayProxyHandler = async (event, _context) => {
  _context.callbackWaitsForEmptyEventLoop = false;
  const params = querystring.parse(event.body);
  try {
    const newUser = new UserModel({
      userId: params.userId,
      pw: params.pw,
      sex: params.sex,
      age: params.age,
      birthDay: params.birthDay,
      favoritGame: params.favoritGame,
      introduce: params.introduce,
      nickName: params.nickName,
      imgPath: params.imgPath,
      phoneNumber: params.phoneNumber
    });

    const newFriend = new FriendModel({
      userId: params.userId
    })

    await connectToDatabase();
    await newUser.save();
    await newFriend.save();
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

export const getUserId: APIGatewayProxyHandler = async (event, _context) => {
  _context.callbackWaitsForEmptyEventLoop = false;
  const params = event.pathParameters.userId;

  try {
    await connectToDatabase();
    let getUser = await UserModel.findOne({ userId: params }).exec();

    if (getUser === null) {
      return response(200, {
        result: true,
        message: "Y",
      });
    } else {
      return response(200, {
        result: true,
        message: "N",
      });
    }
  } catch (e) {
    return response(500, {
      result: false,
      message: "server_err",
    });
  }
};
