import { model } from "mongoose";
import FriendSchema from "./Schema" ;
import { IFriendDocument } from './Types';

export const FriendModel = model<IFriendDocument>("friend",FriendSchema);
