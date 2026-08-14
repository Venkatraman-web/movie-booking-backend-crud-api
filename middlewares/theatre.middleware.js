const StatusCode = require('http-status-codes');
const {StatusCodes} = StatusCode;

const { errorResponseBody } = require('../utils/responsebody');

const validateTheatreCreate = async (req, res, next) => {
    // validate theatre name
    if(!req.body.name){
        errorResponseBody.message = 'The name of the theatre is not present in the request body';
        return res.status(StatusCodes.BAD_REQUEST).
        json(errorResponseBody);
    }

    // validate theatre pincode
    if(!req.body.pincode){
        errorResponseBody.message = 'The pincode of the theatre is not present in the request body';
        return res.status(StatusCodes.BAD_REQUEST).
        json(errorResponseBody);
    }

    // validate theatre city
    if(!req.body.city){
        errorResponseBody.message = 'The city of the theatre is not present in the request body';
        return res.status(StatusCodes.BAD_REQUEST).
        json(errorResponseBody);
    }

    next();

}


const validateUpdateMovies = async (req, res, next) => {

    // validate insert parameter
    if(req.body.insert == undefined){
        errorResponseBody.message = 'The insert paramter is not present in the request body';
        return res.status(StatusCodes.BAD_REQUEST).
        json(errorResponseBody);
    }

    // validate movieIds parameter
    if(!req.body.movieIds){
        errorResponseBody.message = 'The movieIds paramter is not present in the request body';
        return res.status(StatusCodes.BAD_REQUEST).
        json(errorResponseBody);
    }
    
    // validate whether movieIds is an Array
    if(!(req.body.movieIds instanceof Array)){
        errorResponseBody.message = 'The movieIds paramter is not passed as an array in the request body';
        return res.status(StatusCodes.BAD_REQUEST).
        json(errorResponseBody);
    }

    // validating whether movies are present in movieIds array
    if(req.body.movieIds.length <= 0){
        errorResponseBody.message = 'No movies present in the array provided';
        return res.status(StatusCodes.BAD_REQUEST).
        json(errorResponseBody);
    }

    next();

}


module.exports = {
    validateTheatreCreate,
    validateUpdateMovies
};