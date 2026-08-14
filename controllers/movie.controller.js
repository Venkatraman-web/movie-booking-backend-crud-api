const StatusCode = require('http-status-codes');
const {StatusCodes} = StatusCode;


const Movie = require('../models/movie.model');
const movieService = require('../services/movie.service');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody');

const createMovie = async (req, res) => {
    try{
        const response = await movieService.createMovie(req.body);
        if(response.err){
            errorResponseBody.err = response.err;
            errorResponseBody.code = response.code;
            errorResponseBody.message = "Validation failed on few parameters of the request body";
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = 'Successfully created the movie';
        return res.status(StatusCodes.OK).json(successResponseBody);
    }catch(err){
        console.log(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponseBody);
        
    }

}

const deleteMovie = async (req, res) => {
    try{
        const response = await movieService.deleteMovie(req.params.id);

        successResponseBody.data = response;
        successResponseBody.message = 'Successfully deleted the movie';

        return res.status(StatusCodes.OK).json(successResponseBody);
    }catch(err){
        console.log(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponseBody);
        
    }
}

const getMovie = async (req, res) => {
    try{
        const response = await movieService.getMovieById(req.params.id);
        if(response.err){
            errorResponseBody.err = response.err;
            return res.status(response.code).
            json(errorResponseBody);
        }
        successResponseBody.data = response;
        return res.status(StatusCodes.OK).json(successResponseBody);

    }catch(err){
        console.log(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json(errorResponseBody);
    }
}

const updateMovie = async (req, res) => {
    try {
        const response = await movieService.updateMovie(req.params.id, req.body);
        if(response.err){
            errorResponseBody.err = response.err;
            errorResponseBody.message = 'The updates are not trying to validate the schema';
            return res.status(response.code).
            json(errorResponseBody);
        }
        successResponseBody.data = response;
        return res.status(StatusCodes.OK).
        json(successResponseBody);
    } catch (err) {
        console.log(err);
        errorResponseBody.err = err;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json(errorResponseBody);
    }
}

const getMovies = async (req, res) => {
    try {
        const response = await movieService.fetchMovies(req.query);
        if(response.err){
            errorResponseBody.err = response.err;
            return res.status(response.code).
            json(errorResponseBody);
        }
        successResponseBody.data = response;
        return res.status(StatusCodes.OK).
        json(successResponseBody);
    } catch (error) {
        console.log(error);
        errorResponseBody.err = error;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json(errorResponseBody);
    }
}

module.exports = { createMovie, 
    deleteMovie, 
    getMovie, 
    updateMovie,
    getMovies
 };