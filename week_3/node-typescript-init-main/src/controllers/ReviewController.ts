import express, { Request, Response } from 'express';
import { PostBaseResponseDto } from '../interfaces/common/PostBaseResponseDto';
import { ReviewCreateDto } from '../interfaces/review/ReviewCreateDto';
import { ReviewResponseDto } from '../interfaces/review/ReviewResponseDto';
import message from '../modules/responseMessage';
import statusCode from '../modules/statusCode';
import util from "../modules/util";
import { ReviewService } from '../services';
const { validationResult } = require('express-validator');

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

const getReviews = async (req: Request, res: Response) => {
   
    const { movieId } = req.params; 

    try{
        const data: ReviewResponseDto[] = await ReviewService.getReviews(movieId);
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