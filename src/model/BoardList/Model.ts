import { model } from "mongoose";
import BoardSchema from "./Schema" ;
import { IBoardDocument } from './Types';

export const BoardModel = model<IBoardDocument>("board",BoardSchema);
