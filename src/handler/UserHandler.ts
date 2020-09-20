import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { response } from "../common/response/Response";
import { connectToDatabase } from "../common/conncetion/Connection";
import { UserModel } from "../model/User/Model";
import * as AWS from "aws-sdk";
import * as querystring from "querystring";
import * as mime from "mime-types";

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
    });

    await connectToDatabase();
    await newUser.save();
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

export const insertImage: APIGatewayProxyHandler = async (event, _context) => {

  const awsConfig = require('../../awsconfig.json');
  const s3 = new AWS.S3({
    region:awsConfig.region,
    accessKeyId:awsConfig.accessKeyId,
    secretAccessKey:awsConfig.secretAccessKey
  });
  let fileContent = event.isBase64Encoded
    ? Buffer.from(event.body, "base64")
    : event.body;

  let fileName = `${Date.now()}`;
 
  let contentType =
    event.headers["content-type"] || event.headers["Content-Type"];
  let extension = contentType ? mime.extension(contentType) : "";
  let fullFileName = extension ? `${fileName}.${extension}` : fileName;
  
  try {
    await s3.putObject({
        Bucket: "gamepartner",
        Key: fullFileName,
        Body: fileContent,
        Metadata: {},
        ACL: "public-read",
      })
      .promise();

    return response(200, {
      result: true,
      message: "insert_complete",
      data: fullFileName,
    });
    
  } catch (err) {
    
    return response(500, {
      result: true,
      message: "insert_complete",
      data: err,
    });
  }
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

export const getUserImage: APIGatewayProxyHandler = async (event, _context) => {
  _context.callbackWaitsForEmptyEventLoop = false;
  const params = event.pathParameters.imgPath;
  const awsConfig = require('../../awsconfig.json');
  const s3 = new AWS.S3({
    region:awsConfig.region,
    accessKeyId:awsConfig.accessKeyId,
    secretAccessKey:awsConfig.secretAccessKey
  });
  try{
    const data = await s3.getObject({Bucket: 'gamepartner', Key: params}).promise();
    return response(200,{
      result:true,
      message:'get object',
      data:data
    })
  }catch(e){
    return response(500,{
      result:false,
      message:'server_err'
    })
  }
}