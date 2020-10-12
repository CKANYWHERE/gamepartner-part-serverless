import { Serverless } from 'serverless/aws';


const serverlessConfiguration: Serverless = {
  service: {
    name: 'gamepartner',
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: '>=1.72.0',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack','serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      binaryMediaTypes:['multipart/form-data']
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
  },
  functions: {
    insertUser: {
      handler: './src/handler/UserHandler.insertUser',
      events: [
        {
          http: {
            method: 'post',
            path: 'user/insertUser',
          }
        }
      ]
    },
    getUserId: {
      handler: './src/handler/UserHandler.getUserId',
      events: [
        {
          http: {
            method: 'get',
            path: 'user/getUserId/{userId}',
          }
        }
      ]
    },
    insertWantedList:{
      handler: './src/handler/WantedListHandler.insertWantedList',
      events: [
        {
          http: {
            method: 'post',
            path: 'wantedList/insertList',
          }
        }
      ]
    },
    getWantedToList:{
      handler: './src/handler/WantedListHandler.getWantToFriendList',
      events: [
        {
          http: {
            method: 'get',
            path: 'wantedList/getWantToFriendList/{from}',
          }
        }
      ]
    },
    getWantedFromList:{
      handler: './src/handler/WantedListHandler.getWantedList',
      events: [
        {
          http: {
            method: 'get',
            path: 'wantedList/getWantedList/{to}',
          }
        }
      ]
    },
    insertFriend:{
      handler: './src/handler/FriendHandler.insertFriend',
      events: [
        {
          http: {
            method: 'post',
            path: 'friendList/insertFriendList',
          }
        }
      ]
    },
    sendSMS:{
      handler: './src/handler/SMSHandler.sendSMS',
      events: [
        {
          http: {
            method: 'post',
            path: 'sms/sendSms',
            cors:true
          }
        }
      ]
    }
  }
}

module.exports = serverlessConfiguration;
