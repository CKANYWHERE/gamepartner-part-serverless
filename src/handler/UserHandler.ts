import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { response } from '../common/response/Response';
import { connectToDatabase } from '../common/conncetion/Connection';
import { UserModel } from '../model/User/Model';

export const insert: APIGatewayProxyHandler = async (event, _context) => {
 _context.callbackWaitsForEmptyEventLoop = false;
  const body = JSON.parse(event.body);
  try {
    await connectToDatabase();
    await UserModel.create(body.user);
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
