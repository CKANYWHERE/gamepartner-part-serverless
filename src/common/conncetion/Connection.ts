import { Mongoose, connect } from 'mongoose';
const dbConfig = require('../../../dbconfig.json');
let isConnected: boolean = false;

export const connectToDatabase = () => {

    if (isConnected) {
        return Promise.resolve();
    }
    const defaultDb = dbConfig.defaultDb;
    const dbUri: string = defaultDb;

    return connect(dbUri,{useNewUrlParser:true,useUnifiedTopology: true,useCreateIndex:true, useFindAndModify: false }).then((db: Mongoose) => {
        isConnected = db.connection.readyState == 1; // 1 for connected
    }).catch(error => {
        console.log('db error:', error);
        return Promise.reject(error);
    });
};

