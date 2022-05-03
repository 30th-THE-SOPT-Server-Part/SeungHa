import { Request, Response } from "express";
import { PostCreateDto } from "../interfaces/post/PostCreateDto";
import PostService from "../services/PostService";
import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import message from "../modules/responseMessage";
import { PostUpdateDto } from "../interfaces/post/PostUpdateDto";
import { PostResponseDto } from "../interfaces/post/PostResponseDto";



const createPost = async(req: Request, res: Response) => {

    const post: PostCreateDto = req.body;

    try{
        const data: PostBaseResponseDto = await PostService.createPost(post);
        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_POST_SUCCESS, data));

    } catch(error){
        console.log(error)
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));

    }

}


const updatePost = async (req: Request, res: Response) => {
    const { postId } = req.params;
    const post: PostUpdateDto = req.body;

    try {
        await PostService.updatePost(postId, post);
        res.status(statusCode.NO_CONTENT).send(); // .send() 안해주면 postman에서 무한로딩 돌아감

    } catch (error) {
        console.log(error)
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
        
    }


}


const findByPostId = async (req: Request, res: Response) => {
    const { postId } = req.params;
    
    try {

        const data: null | PostResponseDto = await PostService.findByPostId(postId);

        if (!data){
            res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
        } else {
            res.status(statusCode.OK).send(util.success(statusCode.OK, message.READ_POST_SUCCESS, data));
        }
        
    } catch (error) {
        console.log(error)
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
        
    }

}

const deleteUser = async (req: Request, res: Response) => {

    const { postId } = req.params;

    try{
        await PostService.deletePost(postId);
        res.status(statusCode.NO_CONTENT).send(util.success(statusCode.NO_CONTENT, message.DELETE_POST_SUCCESS));


    } catch(error) {
        console.log(error)
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }

}


export default{
    createPost,
    updatePost,
    findByPostId,
    deleteUser
}