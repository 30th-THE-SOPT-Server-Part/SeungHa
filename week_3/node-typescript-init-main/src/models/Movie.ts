import mongoose from "mongoose";
import { MovieInfo } from "../interfaces/Movie/MovieInfo"

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, 
    director: {
        type: String,
        required: true
    }, 
    startDate: {
        type: Date
    },
    thumbnail: {
        type: String,
        required: true
    },
    story: {
        type: String,
        required: true
    }
});



export default mongoose.model<MovieInfo & mongoose.Document>("Movie", MovieSchema);