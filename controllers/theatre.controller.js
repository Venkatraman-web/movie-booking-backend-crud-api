const StatusCode = require('http-status-codes');
const {StatusCodes} = StatusCode;

const theatreService = require('../services/theatre.service');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody');

const create = async (req, res) => {
    try {
        const response = await theatreService.createTheatre(req.body);
        if(response.err){
            errorResponseBody.err = response.err;
            errorResponseBody.message = 'Validation failed on few parameters of the request body';
            return res.status(response.code).
            json(errorResponseBody);

        }
        successResponseBody.data = response;
        successResponseBody.message = 'Successfully created the theatre';
        return res.status(StatusCodes.OK).
        json(successResponseBody);
    } catch (error) {
        errorResponseBody.err = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json(errorResponseBody);
    }
}

const destroy = async (req, res) => {
    try {
        const response = await theatreService.deleteTheatre(req.params.id);
        if(response.err){
            errorResponseBody.err = response.err;
            return res.status(response.code)
            .json(errorResponseBody);
        }
        successResponseBody.data = response;
        return res.status(StatusCodes.OK).
        json(successResponseBody);

    } catch (error) {
        console.log(error);
        errorResponseBody.err = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json(errorResponseBody);
    }
}

const getTheatre = async (req, res) => {
    try {
        const response = await theatreService.getTheatre(req.params.id);
        if(response.err){
            errorResponseBody.err = response.err;
            return res.status(response.code)
            .json(errorResponseBody);
        }

        successResponseBody.data = response;
        return res.status(StatusCodes.OK).
        json(successResponseBody);

    } catch (error) {
        console.log(error);
        errorResponseBody.err = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json(errorResponseBody);

    }
}

const getTheatres = async (req, res) => {
    try {
        const response = await theatreService.getAllTheatres(req.query);
        if(response.err){
            errorResponseBody.err = response.err;
            return res.status(response.code)
            .json(errorResponseBody);
        }

        successResponseBody.data = response;
        successResponseBody.message = 'Successfully fetched all responses';
        return res.status(StatusCodes.OK).
        json(successResponseBody);
        
    } catch (error) {
        console.log(error);
        errorResponseBody.err = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json(errorResponseBody);
    }
}

const update = async (req, res) => {
    try {
        const response = await theatreService.updateTheatre(req.params.id, req.body);

        if(response.err){
            errorResponseBody.err = response.err;
            return res.status(response.code)
            .json(errorResponseBody);
        }

        successResponseBody.data = response;
        successResponseBody.message = 'Updated theatre with given id';
        return res.status(StatusCodes.OK).
                json(successResponseBody);

    } catch (error) {
        console.log(error);
        errorResponseBody.err = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json(errorResponseBody);
    }
}

const updateMovies = async (req, res) => {
    try {

        const response = await theatreService.updateMoviesInTheatres(req.params.id, req.body.movieIds, req.body.insert);

        if(response.err){
            errorResponseBody.err = response.err;
            return res.status(response.code).
            json(errorResponseBody);
        }

        successResponseBody.data = response;
        successResponseBody.message = 'Successfully updated movies in the theatre';
        return res.status(StatusCodes.OK).
        json(successResponseBody);
        
    } catch (error) {
        console.log(error);
        errorResponseBody.err = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(errorResponseBody);
    }
}

const getMovies = async (req, res) => {
    try {
        const response = await theatreService.getMoviesInATheatre(req.params.id);
        if(response.err){
            errorResponseBody.err = response.err;
            return res.status(response.code).
            json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = 'Successfully able to fetch all movies for the given theatreId';

        return res.status(StatusCodes.OK).
        json(successResponseBody);

    } catch (error) {
        errorResponseBody.err = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json(errorResponseBody);
    }
}

const checkMovie = async (req, res) => {
    try {
        const response = await theatreService.checkMovieInATheatre(req.params.theatreId, req.params.movieId);

        if(response.err){
            errorResponseBody.err = response.err;
            return res.status(response.code).
            json(errorResponseBody);
        }

        successResponseBody.data = response;
        successResponseBody.message = 'Successfully completed the checkMovie route';
        return res.status(StatusCodes.OK)
        .json(successResponseBody);


    } catch (error) {
        errorResponseBody.err = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json(errorResponseBody);
    }
}

module.exports = {
    create,
    destroy,
    getTheatre,
    getTheatres,
    update,
    updateMovies,
    getMovies,
    checkMovie
}