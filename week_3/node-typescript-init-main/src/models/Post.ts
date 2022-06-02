import mongoose from "mongoose";
import { PostInfo } from "../interfaces/post/PostInfo";


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    writer_id: {
        type: mongoose.Schema.Types.ObjectId, // type 설정 주의
        required: true,
        ref: "User"
    }, 
    content: {
        type: String,
        required : true
    }, 
});

export default mongoose.model<PostInfo & mongoose.Document>("Post", postSchema);