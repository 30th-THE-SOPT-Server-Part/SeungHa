import { ReviewCreateDto } from "../interfaces/review/ReviewCreateDto";
import { ReviewResponseDto } from "../interfaces/review/ReviewResponseDto";
import Review from "../models/Review";
import { ReviewInfo } from "../interfaces/review/ReviewInfo";
import { ReviewOptionType } from "../interfaces/review/ReviewOptionType";

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


const getReviews = async (movieId: string, search: string, option: ReviewOptionType, page: number) => {

    const regex = (pattern: string) => new RegExp(`.*${pattern}*.`);

    let reviews: ReviewInfo[] = [];
    let perPage: number = 2;

    try {

        const pattern: RegExp = regex(search);

        if (option === 'title'){

            reviews = await Review.find({ title: { $regex: pattern }})
                                .where('movie').equals(movieId)
                                .populate('writer')
                                .sort({ createAt: -1 })
                                .skip(perPage * (page - 1))
                                .limit(perPage);

        } else if (option === 'content'){
            reviews = await Review.find({ content: { $regex: pattern }})
                                .where('movie').equals(movieId)
                                .populate('writer')
                                .sort({ createAt: -1 })
                                .skip(perPage * (page - 1))
                                .limit(perPage);
        } else {
            reviews = await Review.find({
                $or: [
                    { title: { $regex: pattern } },
                    { content: { $reqex: pattern } }
                ]
            })
            .where('movie').equals(movieId)
            .populate('writer')
            .sort({createdAt: -1})
            .skip(perPage * (page - 1))
            .limit(perPage)
        }

        // 특정 영화에 대한 조회이기 때문에 필터에 movie: movieId 를 넣어줘야됨
        const total: number = await Review.countDocuments({ movie: movieId });
        const lastPage: number = Math.ceil(total / perPage);
    
        return {
            reviews,
            lastPage
        };

        // const reviews = await Review.find({
        //     movie: movieId
        // }).populate('writer', 'name').populate('movie'); // writer 객체의 name만, movie 객체 전부 가져옴

        // const data = await Promise.all(reviews.map((review: any) => {
        //     const result = {
        //         writer: review.writer.name, // writer 이름만
        //         movie: review.movie, // movie 객체 전부가 통째로 가져옴
        //         title: review.title, 
        //         content: review.content
        //     };
        //     return result;
        // }));

        // return data; 
        
    } catch (error){
        console.log(error);
        throw error;
    }

}

export default {
    createReview,
    getReviews,
}