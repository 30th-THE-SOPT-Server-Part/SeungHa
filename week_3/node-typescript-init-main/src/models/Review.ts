import mongoose from "mongoose";
import { MovieInfo } from "../interfaces/movie/MovieInfo";

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

export default mongoose.model<MovieInfo & mongoose.Document>("Review", ReviewSchema);