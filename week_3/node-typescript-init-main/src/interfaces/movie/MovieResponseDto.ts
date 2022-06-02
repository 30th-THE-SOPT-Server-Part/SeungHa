import { MovieCommentInfo } from "./MovieInfo";

export interface MovieResponseDto {
    title: string;
    director: string;
    starDate?: Date;
    thumbnail?: string;
    story?: string;
    comments?: MovieCommentInfo[];
}