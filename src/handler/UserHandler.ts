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

/*export const insertImage: APIGatewayProxyHandler = async (event, _context) => {
  _context.callbackWaitsForEmptyEventLoop = false;
  try{
    const s3 = await new AWS.S3();
    const params = querystring.parse(event.body);
    const s3Params = await {
      Bucket: 'gamepartner',
      Key: params.name,
      ContentType: 'image/jpeg',
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

 }*/

export const insertImage: APIGatewayProxyHandler = async (event, _context) => {
  // Extract file content
  const s3 = new AWS.S3();
  let fileContent = event.isBase64Encoded
    ? Buffer.from(event.body, "base64")
    : event.body;
  // Generate file name from current timestamp
  let fileName = `${Date.now()}`;
  // Determine file extension
  let contentType =
    event.headers["content-type"] || event.headers["Content-Type"];
  let extension = contentType ? mime.extension(contentType) : "";
  let fullFileName = extension ? `${fileName}.${extension}` : fileName;
  // Upload the file to S3
  try {
    let data = await s3
      .putObject({
        Bucket: "gamepartner",
        Key: fullFileName,
        Body: fileContent,
        Metadata: {},
      })
      .promise();
    console.log("Successfully uploaded file", fullFileName);

    return response(200, {
      result: true,
      message: "insert_complete",
      data: fullFileName,
    });
  } catch (err) {
    console.log("Failed to upload file", fullFileName, err);
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
