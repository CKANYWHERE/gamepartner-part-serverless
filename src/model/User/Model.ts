import { model } from "mongoose";
import UserSchema from "./Schema" ;
import { IUserDocument } from './Types';

export const UserModel = model<IUserDocument>("user",UserSchema);
