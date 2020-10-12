import {APIGatewayProxyResult} from 'aws-lambda'

const response = (status: number, data:IResponseBody) : APIGatewayProxyResult =>{

    return{
        statusCode:status,
        headers:{
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Headers" : "*",
            'Access-Control-Allow-Credentials': true,
            "Access-Control-Allow-Methods": "POST,GET",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    }
}

export {response};