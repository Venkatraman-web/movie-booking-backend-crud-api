const StatusCode = require('http-status-codes');
const {StatusCodes} = StatusCode;

const {errorResponseBody, successResponseBody} = require('../utils/responsebody');


const ObjectId = require('mongoose').Types.ObjectId;


const verifyCreatePaymentRequest = async (req, res, next) => {
        // validate booking id
        if(!req.body.bookingId){
        errorResponseBody.message = 'The bookingId is not present in the request body';
        return res.status(StatusCodes.BAD_REQUEST).
        json(errorResponseBody);
    }

        // validate correct booking id format
        if(!ObjectId.isValid(req.body.bookingId)){
            errorResponseBody.message = 'The bookingId is not in correct format in the request body';
            return res.status(StatusCodes.BAD_REQUEST).
            json(errorResponseBody);
    }
    // validate amount presence
    if(!req.body.amount){
        errorResponseBody.message = 'The amount is not present in the request body';
        return res.status(StatusCodes.BAD_REQUEST).
        json(errorResponseBody);
    }

    next();

}

module.exports = {
    verifyCreatePaymentRequest
};