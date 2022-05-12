import mongoose from "mongoose";

export interface Review{
    writer: mongoose.Types.ObjectId;
    movie: mongoose.Types.ObjectId;
    title: string;
    content: string;
}