import { model } from "mongoose";
import WantedListSchema from "./Schema" ;
import { IWantedListDocument } from './Types';

export const WantedListModel = model<IWantedListDocument>("wantedList",WantedListSchema);
