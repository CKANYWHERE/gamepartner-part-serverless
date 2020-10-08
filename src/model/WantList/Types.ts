import {Document,Model} from "mongoose"

export interface IWantedList{
    to:String;
    from:String;
    registerDate: Date;
    isConnected: Boolean;
}

export interface IWantedListDocument extends IWantedList, Document {}

export interface IWantedListModel extends Model<IWantedListDocument> {}