import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { response } from '../common/response/Response';
import { connectToDatabase } from '../common/conncetion/Connection';
import { WantedListModel } from '../model/WantList/Model';
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