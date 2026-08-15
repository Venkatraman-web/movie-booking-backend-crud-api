const StatusCode = require('http-status-codes');
const {StatusCodes} = StatusCode;

const { successResponseBody, errorResponseBody } = require('../utils/responsebody');


const verifyTicketNotificationCreateRequest = async (req, res, next) => {
        // validate subject presence
        if(!req.body.subject){
        errorResponseBody.message = 'The subject is not present in the request body';
        return res.status(StatusCodes.BAD_REQUEST).
        json(errorResponseBody);
    }

    // validate content presence
        if(!req.body.content){
        errorResponseBody.message = 'The content is not present in the request body';
        return res.status(StatusCodes.BAD_REQUEST).
        json(errorResponseBody);
    }

    // validate content presence
        if(!req.body.recepientEmails || !(req.body.recepientEmails instanceof Array)){
        errorResponseBody.message = 'No recepresent in the request body';
        return res.status(StatusCodes.BAD_REQUEST).
        json(errorResponseBody);
    }

    next();

}

module.exports = {
    verifyTicketNotificationCreateRequest
};