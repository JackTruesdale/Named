import * as mongoose from 'mongoose';

export const TeachSchema = new mongoose.Schema({
    name: {type: String, required:true},
    subject: {type: String, required:false},
    spec: {type: String, required:false},
    clas: {type: [String], required:false}, 
    picture: {type: String, required:true},

});

export interface Teach extends mongoose.Document {
    id: string,
    name: string,
    subject: string,
    spec: string,
    clas: Array<string>, 
    picture: string,

}