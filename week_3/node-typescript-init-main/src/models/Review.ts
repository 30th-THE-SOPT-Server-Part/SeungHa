import mongoose from "mongoose";
import { ReviewInfo } from "../interfaces/review/ReviewInfo";

const ReviewSchema = new mongoose.Schema({
    writer: {
        type: mongoose.Types.ObjectId, // 타입: ObjectId
        required: true,
        ref: 'User' // 레퍼런스 지정
    },
    movie: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: 'Movie'
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true

    },
})

export default mongoose.model<ReviewInfo & mongoose.Document>("Review", ReviewSchema);