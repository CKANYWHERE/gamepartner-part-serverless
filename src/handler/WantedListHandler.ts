import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { response } from '../common/response/Response';
import { connectToDatabase } from '../common/conncetion/Connection';
import { WantedListModel } from '../model/WantList/Model';
import { UserModel } from '../model/User/Model';
import * as querystring from "querystring";

export const insertWantedList: APIGatewayProxyHandler = async (event, _context) => {
    _context.callbackWaitsForEmptyEventLoop = false;
     const params = querystring.parse(event.body);
     try {
       const newWantedListModel = new WantedListModel({
         to:params.to,
         from:params.from,
       });
   
       await connectToDatabase();
       await newWantedListModel.save();
   
     } catch (e) {
       return response(500,{
         result: true,
         message:'server_err'
       })
     }
    return response(200,{
       result: true,
       message:'insert_complete'
    });
}

export const getWantedList: APIGatewayProxyHandler = async (event, _context) => {
    _context.callbackWaitsForEmptyEventLoop = false;
    const params = event.pathParameters.to;

    try {
      await connectToDatabase();
      let getUserList = await WantedListModel.find({ to: params }).exec();
      let fromList = [];
      let getDetailList = null;

      if(getUserList !== null){
        getUserList.forEach((user)=>{
          fromList.push(user.from);
        });

        getDetailList = await UserModel.find(
          {userId:{$in:fromList}},
          {"_id":0,"userId":0,"pw":0,"__v":0})
          //.select()
          .exec();
      }

  
      if (getDetailList === null) {
        return response(200, {
          result: false,
          message: "no data for to list",
        });
      } else {
        return response(200, {
          result: true,
          data: getDetailList
        });
      }
    } catch (e) {
      
      return response(500, {
        result: false,
        message: "server_err",
      });
    }
};

export const getWantToFriendList: APIGatewayProxyHandler = async (event, _context) => {
    _context.callbackWaitsForEmptyEventLoop = false;
    const params = event.pathParameters.from;

    try {
      await connectToDatabase();
      let getUserList = await WantedListModel.find({ from: params }).exec();
      let toList = []
      let getDetailList = null

      if(getUserList !== null){
        getUserList.forEach((user)=>{
          toList.push(user.to)
        })

        getDetailList = await UserModel.find(
          {userId:{$in:toList}},
          {"_id":0,"userId":0,"pw":0,"__v":0})
          //.select()
          .exec();
      }

      if (getDetailList === null) {
        return response(200, {
          result: false,
          message: "no data for to list",
        });
      } else {
        return response(200, {
          result: true,
          data: getDetailList
        });
      }
    } catch (e) {
      return response(500, {
        result: false,
        message: "server_err",
      });
    }
};
  