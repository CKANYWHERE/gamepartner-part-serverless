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
  resources:{
    Resources:{
      GamePartner:{
        Type: 'AWS::S3::Bucket',
        Properties:{
          BucketName: 'gamepartnercompany',
          AccessControl: 'PublicRead',
          CorsConfiguration:{
            CorsRules:[
              {
                AllowedMethods:['GET','PUT','POST','HEAD'],
                AllowedOrigins: ["*"],
                AllowedHeaders: ["*"]
              }
            ]
          }
        }
      }
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
    iamRoleStatements: [
      {
          Effect: 'Allow',
          Action: ['s3:*'],
          Resource: 'arn:aws:s3:::gamepartner',
      },
  ],
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
    insertImage: {
      handler: './src/handler/UserHandler.insertImage',
      events: [
        {
          http: {
            method: 'post',
            path: 'user/insertImage',
          }
        }
      ]
    },
  }
}

module.exports = serverlessConfiguration;
