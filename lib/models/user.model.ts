import {Schema, models, model} from "mongoose";

export interface userInterface{
    type: String,
    required: true, 
        unique: true
}
const UserSchema = new Schema({
    clerkId:{
        type:String,
        required: true, 
        unique: true
    },
    email: {
        type: String,
        required: true, 
        unique: true
    },
    username:{
        type:  String,
        required: true, 
        unique : true
    },
    photo: {
        type:  String,
        required: true, 
    },
    firstName: String, 
    lastName: String,

    planId: {
        type: Number, 
        default: 1
    },

    creditBalance: {
        type:Number,
        default: 10
    },
})

const UserModel = models?.User || model('User', UserSchema)
export default UserModel;