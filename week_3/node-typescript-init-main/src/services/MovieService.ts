import { MovieCreateDto } from "../interfaces/movie/MovieCreateDto";
import { MovieResponseDto } from "../interfaces/movie/MovieResponseDto";
import { MovieUpdateDto } from "../interfaces/movie/MovieUpdateDto";
import Movie from "../models/Movie";

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

const getMovieById = async (movieId: String) => {

    try{
        const data: MovieResponseDto | null = await Movie.findById(movieId);

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
    getMovieById,
    updateMovie,
    deleteMovie
}