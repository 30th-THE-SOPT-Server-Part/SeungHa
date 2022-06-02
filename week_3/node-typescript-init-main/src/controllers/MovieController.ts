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
import { MovieOptionType } from "../interfaces/movie/MovieOptionType";
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
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 * @route GET /movie?search=&option=&page=
 * @desc GET Movie By Search
 * @access Public
 */
const getMoviesBySearch = async (req: Request, res: Response) => {
    const { search, option } = req.query;

    const isOptionType = (option: string) : option is MovieOptionType => {
        return ["title", "director", "title_director"].indexOf(option) !== -1;
    }

    if (!isOptionType(option as string)) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE))
    }

    // query는 string으로 들어오기 때문에 number로 형변환, 들어오지 않을 경우엔 디폴트값 1을 줌
    const page: number = Number(req.query.page || 1)

    try{
        const data = await MovieService.getMoviesBySearch(search as string, option as MovieOptionType, page); // query로는 다양한 타입이 받아질 수 있기 때문에 타입단언 해줘야함
        res.status(statusCode.OK).send(util.success(statusCode.OK, message.SEARCH_MOVIE_SUCCESS, data));
    } catch(error) {
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
    getMoviesBySearch,
}