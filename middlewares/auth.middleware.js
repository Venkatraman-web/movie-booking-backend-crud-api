const jwt = require("jsonwebtoken");
const StatusCode = require('http-status-codes');
const {StatusCodes} = StatusCode;

const {errorResponseBody, successResponseBody} = require('../utils/responsebody');
const userService = require('../services/user.service');
const {USER_ROLE, USER_STATUS} = require('../utils/constants');

const validateSignUpRequest = async (req, res, next) => {
    // Validate user name
        if(!req.body.name){
            errorResponseBody.err = 'The name of the user is not present in request';
            return res.status(StatusCodes.BAD_REQUEST).
            json(errorResponseBody);

        }
        // validate user email
        if(!req.body.email){
            errorResponseBody.err = 'The email of the user is not present in request';
            return res.status(StatusCodes.BAD_REQUEST).
            json(errorResponseBody);
        }
        // validate user password 
        if(!req.body.password){
            errorResponseBody.err = 'The password of the user is not present in request';
            return res.status(StatusCodes.BAD_REQUEST).
            json(errorResponseBody);
        }

        next();

}

const validateSignInRequest = async (req, res, next) => {
    // validate user email presence
    if(!req.body.email){
            errorResponseBody.err = 'The email of the user is not present in request';
            return res.status(StatusCodes.BAD_REQUEST).
            json(errorResponseBody);
        }

    // validate user password presence
    if(!req.body.password){
        errorResponseBody.err = 'The password of the user is not present in request';
        return res.status(StatusCodes.BAD_REQUEST).
        json(errorResponseBody);
    }

    next();

}

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
    if(!token){
        errorResponseBody.err = 'No token provided';
        return res.status(StatusCodes.NOT_FOUND)
        .json(errorResponseBody);
    }

    const response = jwt.verify(token, process.env.AUTH_KEY);

    if(!response){
        errorResponseBody.err = 'Token not verified'
        return res.status(StatusCodes.NOT_ACCEPTABLE)
        .json(errorResponseBody);
    }
        const user = await userService.getUserById(response.id);
        req.user = user.id;

        next(); 

    } catch (error) {
        console.log(error);
        if(error.name == 'JsonWebTokenError'){
            errorResponseBody.err = error.message;
            return res.status(StatusCodes.BAD_REQUEST).
            json(errorResponseBody);
        }
        if(error.code == 404){
            errorResponseBody.err = 'User does not exist';
            return res.status(StatusCodes.NOT_FOUND).
            json(errorResponseBody);
        }

        errorResponseBody.err = error;
        return res.status(500).
            json(errorResponseBody);

    }
    

}

const validateRestPasswordRequest = async (req, res, next) => {
    // validate old password
    if(!req.body.oldPassword){
        errorResponseBody.err = 'The oldPassword of the user is not present in request';
        return res.status(StatusCodes.BAD_REQUEST).
        json(errorResponseBody);
    }

    // validate new password
    if(!req.body.oldPassword){
        errorResponseBody.err = 'The newPassword of the user is not present in request';
        return res.status(StatusCodes.BAD_REQUEST).
        json(errorResponseBody);
    }

    next();
}

const isAdmin = async (req, res, next) => {
    const user = await userService.getUserById(req.user);
    if(user.userRole != USER_ROLE.admin){
        errorResponseBody.err = 'The user is not an admin';
        return res.status(StatusCodes.BAD_REQUEST).
        json(errorResponseBody);
    }

    next();
}

const isClient = async (req, res, next) => {
    const user = await userService.getUserById(req.user);
    if(user.userRole != USER_ROLE.client){
        errorResponseBody.err = 'The user is not an client';
        return res.status(StatusCodes.BAD_REQUEST).
        json(errorResponseBody);
    }

    next();
}

const isAdminOrClient = async (req, res, next) => {
    const user = await userService.getUserById(req.user);
    if(user.userRole == USER_ROLE.customer){
        errorResponseBody.err = 'The user is not either a client nor a admin';
        return res.status(StatusCodes.BAD_REQUEST).
        json(errorResponseBody);
    }

    next();
}

module.exports = {
    validateSignUpRequest,
    validateSignInRequest,
    isAuthenticated,
    validateRestPasswordRequest,
    isAdmin,
    isClient,
    isAdminOrClient
};