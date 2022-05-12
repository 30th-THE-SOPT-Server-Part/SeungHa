import mongoose from "mongoose";

export interface PostUpdateDto {
    title?: string;
    writer_id: typeof mongoose.Schema.Types.ObjectId;
    content?: string;
}