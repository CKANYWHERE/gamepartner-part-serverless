import {Document,Model} from "mongoose"

export interface IUser{
    userId: string;
    pw: string;
    sex: string;
    age: number;
    birthDay: string;
    favoritGame: string;
    introduce: string;
    nickName:string;
    imgPath:string;
    liked:number;
    phoneNumber:string;
}

export interface IUserDocument extends IUser, Document {}

export interface IUserModel extends Model<IUserDocument> {}