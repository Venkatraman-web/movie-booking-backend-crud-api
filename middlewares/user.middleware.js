const StatusCode = require('http-status-codes');
const {StatusCodes} = StatusCode;

const { errorResponseBody } = require('../utils/responsebody');

const validateUpdateUserRequest = async (req, res, next) => {
    // validate the presence of atleast one of userRole or userStatus
    if(!(req.body.userRole || req.body.userStatus)){
        errorResponseBody.message = 'Both of userRole or userStatus is not present in the request body';
        return res.status(StatusCodes.BAD_REQUEST).
        json(errorResponseBody);
    }

    next();
}

module.exports = {
    validateUpdateUserRequest
}