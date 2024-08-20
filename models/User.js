import mongoose from "mongoose";

const {Schema, model, models } = mongoose;

const UserSchema = new Schema({
    email: {
        type:String ,
        required:true
    },
    name:{
        type:String,
    },
    username:{
        type:String,
        required:true
    },
    coverPic:{ type:String },
    profilePic: { type: String },
    razorId:{type:String},
    razorsecret:{type:String}

},{timestamps:true})


const User =  models.User || model("User", UserSchema);
export default User;