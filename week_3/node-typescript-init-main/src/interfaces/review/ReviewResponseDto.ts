import { ReviewInfo } from "../review/ReviewInfo";

export interface ReviewResponseDto {
    reviews: ReviewInfo[];
    lastPage: number;
}