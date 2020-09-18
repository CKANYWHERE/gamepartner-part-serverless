import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { response } from '../common/response/Response';
import { connectToDatabase } from '../common/conncetion/Connection';
import { UserModel } from '../model/User/Model';
import * as AWS from 'aws-sdk';
import * as querystring from "querystring";

export const insertUser: APIGatewayProxyHandler = async (event, _context) => {
 _context.callbackWaitsForEmptyEventLoop = false;
  const params = querystring.parse(event.body);
  try {

    const newUser = new UserModel({
      userId:params.userId,
      pw:params.pw,
      sex:params.sex,
      age:params.age,
      birthDay:params.birthDay,
      favoritGame:params.favoritGame,
      introduce:params.introduce,
      nickName:params.nickName,
      imgPath:params.imgPath
    });

    await connectToDatabase();
    await newUser.save();

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
    const s3 = await new AWS.S3();
    //const params = await JSON.parse(event.body);
    const params = querystring.parse(event.body);
    const s3Params = await {
      Bucket: 'gamepartner',
      Key: params.name,
      ContentType: 'multipart/form-data',
      ACL: 'public-read'
    }
    const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params);

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

 export const getUserId : APIGatewayProxyHandler = async (event, _context) => {
  _context.callbackWaitsForEmptyEventLoop = false;
  //console.log(event.pathParameters);
  const params = event.pathParameters.userId;
  //console.log(params);
  
  try{ 

    await connectToDatabase();
    let getUser = await UserModel.findOne({userId:params}).exec();
    console.log(getUser);
    
    if(getUser === null){
      return response(200,{
        result: true,
        message:'Y',
      });
    }else{
      return response(200,{
        result: true,
        message:'N',
      });
    }
  }catch(e){
    return response(500,{
      result: false,
      message:'server_err',
    });
  }

}