import mongoose from "mongoose";

export interface PostInfo {
    title: string;
    writer_id: typeof mongoose.Schema.Types.ObjectId;
    content: string;
}