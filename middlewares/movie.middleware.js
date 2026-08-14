const StatusCode = require('http-status-codes');
const {StatusCodes} = StatusCode;

const badRequestResponse = {
    success: false,
    err: "",
    data: {},
    message: 'Malformed Request | Bad Request'
}

const validateMovieCreateRequest = async (req, res, next) => {
    // Validate movie name
        if(!req.body.name){
            badRequestResponse.err = 'The name of the movie is not present in request';
            return res.status(StatusCodes.BAD_REQUEST).
            json(badRequestResponse);

        }

        // Validate movie description
        if(!req.body.description){
            badRequestResponse.err = 'The description of the movie is not present in request';
            return res.status(StatusCodes.BAD_REQUEST).
            json(badRequestResponse);
        }

        // Validate movie casts
        if(!(req.body.casts || req.body.casts instanceof Array || req.body.casts.length <= 0)){
            badRequestResponse.err = 'The casts of the movie is not present in request';
            return res.status(StatusCodes.BAD_REQUEST).
            json(badRequestResponse);
        }

        // Validate movie trailer url
        if(!req.body.trailerUrl){
            badRequestResponse.err = 'The trailerUrl of the movie is not present in request';
            return res.status(StatusCodes.BAD_REQUEST).
            json(badRequestResponse);
        }

        // Validate movie release Date
        if(!req.body.releaseDate){
            badRequestResponse.err = 'The releaseDate of the movie is not present in request';
            return res.status(StatusCodes.BAD_REQUEST).
            json(badRequestResponse);
        }

        // Validate movie director
        if(!req.body.director){
            badRequestResponse.err = 'The director of the movie is not present in request';
            return res.status(StatusCodes.BAD_REQUEST).
            json(badRequestResponse);
        }

        next();

        // Validate 
}

module.exports = {
    validateMovieCreateRequest
}