import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { response } from '../common/response/Response';
import { connectToDatabase } from '../common/conncetion/Connection';
import { UserModel } from '../model/User/Model';
import * as AWS from 'aws-sdk';

export const insertUser: APIGatewayProxyHandler = async (event, _context) => {
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

export const insertImage: APIGatewayProxyHandler = async (event, _context) => {
  _context.callbackWaitsForEmptyEventLoop = false;
  try{
    const s3 = new AWS.S3();
    const params = JSON.parse(event.body);
    const s3Params = {
      Bucket: 'userpicture',
      Key: params.name,
      ContentType: params.type,
      ACL: 'public-read'
    }
  
    const uploadURL = s3.getSignedUrl('putObject', s3Params)

    return response(200,{
      result: true,
      message:'insert_complete',
      data:uploadURL
    });

  }catch(e){
    return response(500,{
      result: false,
      message:'server_err',
    });
  }


 }