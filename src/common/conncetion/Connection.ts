import { Mongoose, connect } from 'mongoose';
let isConnected: boolean = false;

export const connectToDatabase = () => {

    if (isConnected) {
        return Promise.resolve();
    }
    console.log('env:', process.env.db);
    const defaultDb = process.env.db || 'mongodb+srv://janu723:changk1325!@gamepartener.pp7ww.mongodb.net/gamepartner?retryWrites=true&w=majority';
    const dbUri: string = defaultDb;

    return connect(dbUri,{useNewUrlParser:true,useUnifiedTopology: true}).then((db: Mongoose) => {
        isConnected = db.connection.readyState == 1; // 1 for connected
    }).catch(error => {
        console.log('db error:', error);
        return Promise.reject(error);
    });
};
