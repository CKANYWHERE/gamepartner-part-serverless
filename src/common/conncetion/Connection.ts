import { Mongoose, connect } from 'mongoose';
let isConnected: boolean = false;

export const connectToDatabase = () => {
    console.log('Start connecting db...');
    if (isConnected) {
        return Promise.resolve();
    }
    console.log('env:', process.env.db);
    const defaultDb = process.env.db || 'mongodb+srv://janu723:changk1325!@gamepartener.pp7ww.mongodb.net/gamepartner?retryWrites=true&w=majority';
    const dbUri: string = defaultDb;
    console.log(dbUri);
    return connect(dbUri).then((db: Mongoose) => {
        isConnected = db.connection.readyState == 1; // 1 for connected
    }).catch(error => {
        console.log('db error:', error);
        return Promise.reject(error);
    });
};
