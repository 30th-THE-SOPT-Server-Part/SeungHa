import { Request, Response } from "express";
import { UserCreateDto } from "../interfaces/user/UserCreateDto";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import UserService from "../services/UserService";
import message from "../modules/responseMessage";
import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { UserUpdateDto } from "../interfaces/user/UserUpdateDto";
import { UserResponseDto } from "../interfaces/user/UserResponseDto";
import getToken from "../modules/jwtHandler";
import { UserSignInDto } from "../interfaces/user/UserSignInDto";
const { validationResult } = require("express-validator");


const createUser = async (req: Request, res: Response) => {
    
    const error = validationResult(req);

    if (!error.isEmpty()){
        console.log(error);
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST, res.json({ errors: error.array() })));
    }
    
    const userCreateDto: UserCreateDto = req.body;

    try {
    
        // email이 중복되었을 경우 service에서 null 반환됨 fail 메시지 반환
        const result: PostBaseResponseDto | null = await UserService.createUser(userCreateDto);
        if (!result) return res.status(statusCode.CONFLICT).send(util.fail(statusCode.CONFLICT, message.DUPLICATED));

        // 토큰 만들어줌
        const accessToken = getToken(result._id);

        // data에 토큰까지 넣어서 반환
        const data = {
            _id: result._id,
            accessToken
        }

        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_USER_SUCCESS, data));
    
    } catch(error) {
        console.log(error)
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));

    }
    
}

const signInUser =async (req: Request, res: Response) => {

    const error = validationResult(req);

    if (!error.isEmpty()){
        console.log(error);
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST, res.json({ errors: error.array() })));
    }

    const userSignInDto: UserSignInDto = req.body;

    try{

        const result = await UserService.signInUser(userSignInDto);
        if (!result) return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, message.INVAILED_PASSWORD));

        const accessToken = getToken((result as PostBaseResponseDto)._id); // result가 다른 타입이 들어올 수 있는 여지가 있기 때문에 타입 단언을 해주어야 함

        const data = {
            _id: (result as PostBaseResponseDto)._id,
            accessToken
        }

        res.status(statusCode.OK).send(util.success(statusCode.OK, message.SIGNIN_USER_SUCCESS));

    } catch(error){

        console.log(error)
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));

    }
    
}


const updateUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const userUpdateDto: UserUpdateDto = req.body;

    try{
        await UserService.updateUser(userId, userUpdateDto);
        res.status(statusCode.NO_CONTENT).send();

    } catch(error) {
        console.log(error)
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
        
    }
}

const findByUserId = async (req: Request, res: Response) => {
    const { userId } = req.params

    try{
        const data: UserResponseDto | null = await UserService.findByUserId(userId);

        if (!data){
            res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
        } else {
            res.status(statusCode.OK).send(util.success(statusCode.OK, message.READ_USER_SUCCESS, data));
        }

    } catch(error){
        console.log(error)
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}


const deleteUser = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        await UserService.deleteUser(userId);
        res.status(statusCode.NO_CONTENT).send(util.success(statusCode.NO_CONTENT, message.DELETE_USER_SUCCESS));
        
    } catch (error) {
        console.log(error)
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

export default {
    createUser,
    updateUser,
    signInUser,
    findByUserId,
    deleteUser
}