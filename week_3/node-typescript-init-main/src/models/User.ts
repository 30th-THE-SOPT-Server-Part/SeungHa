import mongoose from "mongoose";
import { UserInfo } from "../interfaces/user/UserInfo";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number
    },
    password:{
        type: String,
        required: true,
    },
    school: {
        name: { type: String },
        major: { type: String}
    }
});

export default mongoose.model<UserInfo & mongoose.Document>("User", userSchema);