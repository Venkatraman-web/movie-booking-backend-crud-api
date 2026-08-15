const {errorResponseBody, successResponseBody} = require('../utils/responsebody');
const {USER_ROLE, BOOKING_STATUS} = require('../utils/constants');

const ObjectId = require('mongoose').Types.ObjectId;
const StatusCode = require('http-status-codes');

const {StatusCodes} = StatusCode;

const theatreService = require('../services/theatre.service');
const userService = require('../services/user.service');

const validateBookingCreateRequest = async (req, res, next) => {
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

    // check if theatre is present in db
    const theatre = await theatreService.getTheatre(req.body.theatreId);
    if(!theatre){
        errorResponseBody.err = 'No theatre found for given id';
        return res.status(StatusCodes.NOT_FOUND).
        json(errorResponseBody);
    }

    // validate movieId presence
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

    // validate if movie present in theatre or not
    if(theatre.movies.indexOf(req.body.movieId) == -1){
        errorResponseBody.message = 'The given movie is not present in that theatre';
        return res.status(StatusCodes.NOT_FOUND).
        json(errorResponseBody);
    }

    // validate presence of timings
    if(!req.body.timing){
        errorResponseBody.message = 'The timing of movie is not present in the request body';
        return res.status(StatusCodes.BAD_REQUEST).
        json(errorResponseBody);
    }

    // validate noOfSeats presence
    if(!req.body.noOfSeats){
        errorResponseBody.message = 'The noOfSeats is not present in the request body';
        return res.status(StatusCodes.BAD_REQUEST).
        json(errorResponseBody);
    }

        next();
}

const canChangeStatus = async (req, res, next) => {
    const user = await userService.getUserById(req.user);
    if(user.userRole == USER_ROLE.customer && req.body.status && req.body.status != BOOKING_STATUS.cancelled){
        errorResponseBody.err = "You are not allowed to change the booking status"
        return res.status(StatusCodes.FORBIDDEN).
        json(errorResponseBody);
    }

    next();
}

module.exports = {
    validateBookingCreateRequest,
    canChangeStatus
};