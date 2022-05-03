import Post from "../models/Post"
import { PostCreateDto } from "../interfaces/post/PostCreateDto";
import { PostUpdateDto } from "../interfaces/post/PostUpdateDto";
import { PostResponseDto } from "../interfaces/post/PostResponseDto";


const createPost = async (postCreateDto: PostCreateDto) => {

    try{

        const post = new Post({
            title: postCreateDto.title,
            writer_id: postCreateDto.writer_id,
            content: postCreateDto.content
        });
    
        await post.save();
    
        const data = {
            _id: post._id
        };
    
        return data;

    } catch(error) {

        console.log(error);
        throw error;

    }
    
}

const updatePost = async ( postId: string, postUpdateDto: PostUpdateDto ) => {

    try {
        
        await Post.findByIdAndUpdate(postId, postUpdateDto);

    } catch (error) {
        console.log(error);
        throw error;
        
    }

}

const findByPostId = async ( postId: string ) => {

    try {
        const data: PostResponseDto | null = await Post.findByIdAndUpdate(postId);
        return data;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

const deletePost = async ( postId: string ) => {

    try{
        await Post.findByIdAndDelete(postId);

    } catch(error){
        console.log(error);
        throw error;
    }

}

export default {
    createPost,
    updatePost,
    findByPostId,
    deletePost
}