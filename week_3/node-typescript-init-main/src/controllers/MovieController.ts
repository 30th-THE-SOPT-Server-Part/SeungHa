import { Request, Response } from "express";
import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { MovieCommentCreateDto } from "../interfaces/movie/MovieCommentCreateDto";
import { MovieCreateDto } from "../interfaces/movie/MovieCreateDto";
import { MovieResponseDto } from "../interfaces/movie/MovieResponseDto";
import { MovieUpdateDto } from "../interfaces/movie/MovieUpdateDto";
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import MovieService from "../services/MovieService";
import { MovieCommentUpdateDto } from "../interfaces/movie/MovieCommentUpdateDto";
const { validationResult } = require("express-validator");


const createMovie = async (req: Request, res: Response) => {

    const error = validationResult(req);

    if (!error.isEmpty()){
        console.log(error);
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST, res.json({ errors: error.array() })));
    } 

    try{

        const movieCreateDto: MovieCreateDto = req.body;

        const data: PostBaseResponseDto = await MovieService.createMovie(movieCreateDto);

        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_MOVIE_SUCCESS, data));

    } catch (error){
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }

}

const createMovieComment = async (req: Request, res: Response) => {
    const error = validationResult(req);

    if (!error.isEmpty()){
        console.log(error);
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST, res.json({ errors: error.array() })));
    } 

    const movieCommentCreateDto: MovieCommentCreateDto = req.body;
    const { movieId } = req.params;

    try{

        const data = await MovieService.createMovieComment(movieCommentCreateDto, movieId);
        if (!data) return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));

        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_COMMENT_SUCCESS, data));

    }catch(error){
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }




}



const getMovieById = async(req: Request, res: Response) => {
    
    const { movieId } = req.params;

    try {
        const data: null | MovieResponseDto = await MovieService.getMovieById(movieId);

        if (!data){
            return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
        }

        res.status(statusCode.OK).send(util.success(statusCode.OK, message.READ_MOVIE_SUCCESS, data));
        
    } catch (error) {
        console.log(error)
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }

}


const updateMovie = async(req: Request, res: Response) => {
    
    const { movieId } = req.params;
    const movieUpdateDto: MovieUpdateDto = req.body;

    try {
       
        MovieService.updateMovie(movieId, movieUpdateDto);    
        res.status(statusCode.NO_CONTENT).send(util.success(statusCode.NO_CONTENT, message.UPDATE_MOVIE_SUCCESS));
        
    } catch (error) {
        console.log(error)
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }

}

/**
 *  @route PUT /movie/:movieId/comments/:commentId
 *  @desc Update Movie Comment
 *  @access Public
 */

const updateMovieComment = async (req: Request, res: Response) => {
    const error = validationResult(req);

    if (!error.isEmpty()){
        console.log(error);
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST, res.json({ errors: error.array() })));
    } 
    
    const movieCommentUpdateDto: MovieCommentUpdateDto = req.body;
    const { movieId, commentId } = req.params;

    try{

        const data = await MovieService.updateMovieComment(movieId, commentId, req.body.user.id, movieCommentUpdateDto);
        
        if (!data) return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
        res.status(statusCode.NO_CONTENT).send();

    } catch(error){

        console.log(error);
        res.status(statusCode.NO_CONTENT).send(util.success(statusCode.NO_CONTENT, message.DELETE_MOVIE_SUCCESS));

    }

}

const deleteMovie = async (req: Request, res: Response) => {

    const { movieId } = req.params;

    try {
        
        await MovieService.deleteMovie(movieId);
        res.status(statusCode.NO_CONTENT).send(util.success(statusCode.NO_CONTENT, message.DELETE_MOVIE_SUCCESS));


    } catch (error) {
        console.log(error);
        res.status(statusCode.NO_CONTENT).send(util.success(statusCode.NO_CONTENT, message.DELETE_MOVIE_SUCCESS));
    }
}

export default{
    createMovie,
    getMovieById,
    updateMovie,
    deleteMovie,
    createMovieComment,
    updateMovieComment,
}