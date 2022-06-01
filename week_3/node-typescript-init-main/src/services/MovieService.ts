import { MovieCreateDto } from "../interfaces/movie/MovieCreateDto";
import { MovieResponseDto } from "../interfaces/movie/MovieResponseDto";
import { MovieUpdateDto } from "../interfaces/movie/MovieUpdateDto";
import { MovieCommentCreateDto } from "../interfaces/movie/MovieCommentCreateDto";
import { MovieCommentInfo, MovieInfo} from "../interfaces/movie/MovieInfo"; 
import Movie from "../models/Movie";
import { MovieCommentUpdateDto } from "../interfaces/movie/MovieCommentUpdateDto";

const createMovie = async (movieCreateDto: MovieCreateDto) => {

    try{

        const movie = new Movie({
            title: movieCreateDto.title,
            director: movieCreateDto.director,
            startDate: movieCreateDto.startDate,
            thumbnail: movieCreateDto.thumbnail,
            story: movieCreateDto.story
        });

        await movie.save();

        const data = {
            _id: movie._id
        };

        return data;        

    } catch(error){
        console.log(error);
        throw error;

    }

}

const createMovieComment = async (movieCommentCreateDto: MovieCommentCreateDto, movieId: String): Promise<MovieInfo | null> => {

    try{

        // 영화 정보 없는 경우
        const movie = Movie.findById(movieId);
        if (!movie) return null

        // spread(전개 연산자)로 기존의 movie.comment 배열에다가 movieCommentCreateDto 추가한 newComments 배열 만들어줌
        // ...movie.comments 빨간줄 에러 - any로 해결
        const newComments: MovieCommentInfo[] = [...(movie as any).comments, movieCommentCreateDto];
        
        // _id가 movieId인 movie 객체를 찾아서 movie.comments를 아까 만든 newComments로 바꿔줌 
        // {new: true}를 지정해주면 업데이트하고 난 뒤의 값을 리턴함
        const updateMovie = await Movie.findOneAndUpdate({ _id: movieId }, { comments: newComments}, { new: true });
        if (!updateMovie) return null; 

        return updateMovie;
    
    } catch(error){
        console.log(error);
        throw(error);
    }

}

const getMovieById = async (movieId: string): Promise<MovieResponseDto | null> => {

    try{
        const data: MovieResponseDto | null = await Movie.findById(movieId).populate('comments.writer', 'name');
        
        if (!data){
            return null
        }

        return data;

    } catch (error) {
        console.log(error);
        throw error;
    }

}


const updateMovie = async (movieId: string, movieUpdateDto: MovieUpdateDto) => {

    try {

        await Movie.findByIdAndUpdate(movieId, movieUpdateDto);

    } catch(error){
        console.log(error);
        throw error;

    }

}

const updateMovieComment = async(movieId: string, commentId: string, userId: string, movieCommentUpdateDto: MovieCommentUpdateDto ) => {

    try {
        const movie = await Movie.findById(movieId);
        if (!movie) return null;


        // 배열을 수정할 때 mongodb raw query를 작성해서 가져옴. $ 붙은 애들이 mongodb의 raw query 문법이라고 생각하면 됨
        const data = await Movie.findOneAndUpdate(

            // _id가 movieId인 Movie 객체를 찾고 그 객체의 comments 배열의 요소 중 comment id가 commentId고 comment writer가 userId인 comment 객체를 가져옴
            { _id: movieId, comments: { $elemMatch: { _id: commentId, writer: userId}}}, 
            {
                // 해당 movie 객체의 해당 comment의 wirter를 userId로, comment를 movieCommentUpdateDto로 수정해줌
                $set: {
                    'comments.$writer': userId,
                    'comments.$comment': movieCommentUpdateDto.comment
                }
            }, { new: true });
        
        return data;

    } catch (error) {
        console.log(error);
        throw error;
    }

}


const deleteMovie = async (movieId: string) => {

    try {
        
        await Movie.findByIdAndDelete(movieId);

    } catch (error) {

        console.log(error);
        throw error;
    
    }

}


export default {
    createMovie,
    createMovieComment,
    getMovieById,
    updateMovie,
    updateMovieComment,
    deleteMovie,
}