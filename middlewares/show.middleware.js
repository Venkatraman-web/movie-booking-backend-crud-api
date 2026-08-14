const StatusCode = require('http-status-codes');
const {errorResponseBody, successResponseBody} = require('../utils/responsebody');
const ObjectId = require('mongoose').Types.ObjectId;

const {StatusCodes} = StatusCode;

const validateCreateShowRequest = async (req, res, next) => {
    // validate theatre id
    if(!req.body.theatreId){
        errorResponseBody.message = 'The id of theatre is not present in the request body';
        return res.status(StatusCodes.BAD_REQUEST).
        json(errorResponseBody);
    }

    // validate correct theatre id format
        if(!ObjectId.isValid(req.body.theatreId)){
            errorResponseBody.message = 'The id of theatre is not in correct format in the request body';
            return res.status(StatusCodes.BAD_REQUEST).
            json(errorResponseBody);
    }

    // validate movie presence
    if(!req.body.movieId){
        errorResponseBody.message = 'The id of movie is not present in the request body';
        return res.status(StatusCodes.BAD_REQUEST).
        json(errorResponseBody);
    }

    // validate correct movie id format
        if(!ObjectId.isValid(req.body.movieId)){
            errorResponseBody.message = 'The id of movie is not in correct format in the request body';
            return res.status(StatusCodes.BAD_REQUEST).
            json(errorResponseBody);
    }

    // validate timing presence
    if(!req.body.timing){
        errorResponseBody.message = 'The timing of movie is not present in the request body';
        return res.status(StatusCodes.BAD_REQUEST).
        json(errorResponseBody);
    }

    // validate noOfSeats presence
    if(!req.body.noOfSeats){
            errorResponseBody.message = 'The seats number is not present in the request body';
            return res.status(StatusCodes.BAD_REQUEST).
            json(errorResponseBody);
    }

    // validate price presence
    if(!req.body.price){
            errorResponseBody.message = 'The price amt is not present in the request body';
            return res.status(StatusCodes.BAD_REQUEST).
            json(errorResponseBody);
    }

    next();

}

const validateUpdateShowRequest = async (req, res, next) => {
        if(req.body.theatreId || req.body.movieId){
            errorResponseBody.err = 'we cannot update already existing theatre and movie ';
            return res.status(500).
            json(errorResponseBody);
        }

        next();
}

module.exports = {
    validateCreateShowRequest,
    validateUpdateShowRequest
};