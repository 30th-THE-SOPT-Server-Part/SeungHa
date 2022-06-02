import mongoose from "mongoose";

export interface MovieInfo{
    title: string;
    director: string;
    starDate: Date;
    thumbnail: string;
    story: string;
    comments: MovieCommentInfo[];
}

export interface MovieCommentInfo {
    writer: mongoose.Types.ObjectId | string;
    comment: string;
}

