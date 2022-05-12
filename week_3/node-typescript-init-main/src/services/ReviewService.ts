import { ReviewCreateDto } from "../interfaces/review/ReviewCreateDto";
import { ReviewResponseDto } from "../interfaces/review/ReviewResponseDto";
import Review from "../models/Review";

const createReview = async (movieId: string, reviewCreateDto: ReviewCreateDto ) => {

    try{
        const review = new Review({
            writer: reviewCreateDto.writer,
            title: reviewCreateDto.title,
            movie: movieId,
            content: reviewCreateDto.content
        })
    
        await review.save();
    
        const data = {
            _id: review._id
        }
    
        return data

    } catch(error){
        console.log(error);
        throw error;
    }    
}

const getReviews = async (movieId: string): Promise<ReviewResponseDto[]> => {

    try{
        const reviews = await Review.find({
            movie: movieId
        }).populate('writer', 'name').populate('movie'); // writer 객체의 name만, movie 객체 전부 가져옴

        const data = await Promise.all(reviews.map((review: any) => {
            const result = {
                writer: review.writer.name, // writer 이름만
                movie: review.movie, // movie 객체 전부가 통째로 가져옴
                title: review.title, 
                content: review.content
            };
            return result;
        }));

        return data;
        
    } catch (error){
        console.log(error);
        throw error;
    }
}


export default{
    createReview,
    getReviews,
}