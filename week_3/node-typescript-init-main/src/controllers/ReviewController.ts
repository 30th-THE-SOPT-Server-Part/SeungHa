import express, { Request, Response } from 'express';
import { PostBaseResponseDto } from '../interfaces/common/PostBaseResponseDto';
import { ReviewCreateDto } from '../interfaces/review/ReviewCreateDto';
import { ReviewResponseDto } from '../interfaces/review/ReviewResponseDto';
import message from '../modules/responseMessage';
import statusCode from '../modules/statusCode';
import util from "../modules/util";
import { ReviewService } from '../services';
const { validationResult } = require('express-validator');
import { ReviewOptionType } from "../interfaces/review/ReviewOptionType";

const createReview = async (req: Request, res: Response) => {

    const error = validationResult(req);
    if (!error.isEmpty()){
        console.log(error);
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST, res.json({ errors: error.array() })));
    }

    try{
        
        const reviewCreateDto: ReviewCreateDto = req.body;
        const { movieId } = req.params;

        const data: PostBaseResponseDto= await ReviewService.createReview(movieId, reviewCreateDto);
        res.status(statusCode.OK).send(util.success(statusCode.OK, message.CREATE_REVIEW_SUCCESS, data));


    } catch(error){
        console.log(error)
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.READ_REVIEW_FAIL));
        
    }
}

// 특정 영화의 리뷰 검색 
const getReviews = async (req: Request, res: Response) => {
   
    const { movieId } = req.params; 
    const { search, option } = req.query;
    
    const isOptionType = (option: string): option is ReviewOptionType => {
        return ["title", "content", "title_content"].indexOf(option) !== -1;
    }

    if (!isOptionType(option as string)) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE))
    }

    const page: number  = Number(req.query.page || 1);

    try{
        const data = await ReviewService.getReviews(movieId, search as string, option as ReviewOptionType, page)
        console.log("Controller = ", data)
        res.status(statusCode.OK).send(util.success(statusCode.OK, message.READ_REVIEW_SUCCESS, data));

    } catch(error){
        console.log(error)
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.READ_REVIEW_FAIL));

    }
    
}


export default {
    createReview,
    getReviews,
}