const jwt = require('jsonwebtoken');
const StatusCode = require('http-status-codes');
const {StatusCodes} = StatusCode;

const userService = require('../services/user.service');
const { errorResponseBody, successResponseBody } = require('../utils/responsebody');

const { User } = require('../models/user.model');


const signup = async (req, res) => {
    try {
        const response = await userService.createUser(req.body);

        successResponseBody.data = response;
        successResponseBody.message = 'Successfully signed up the user';

        return res.status(StatusCodes.OK).
        json(successResponseBody);
    } catch (error) {
        console.log(error);
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).
            json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(errorResponseBody);
    }
}

const signin = async (req, res) => {
    try {
        const user = await userService.getUserByEmail(req.body.email);
        const isValidPassword = await user.isValidPassword(req.body.password);

        if(!isValidPassword){
            throw {
                err: 'Invalid password for given email id',
                code: StatusCodes.BAD_REQUEST
            }
        }
        const token = await jwt.sign({
            id: user._id,
            email: user.email,
        }, process.env.AUTH_KEY);



        successResponseBody.message = 'Successfully logged in ';
        successResponseBody.data = {
            email: user.email,
            role: user.userRole,
            status: user.userStatus,
            token: token
        };

        return res.status(StatusCodes.OK).
        json(successResponseBody);

    } catch (error) {
        console.log(error);
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).
            json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json(errorResponseBody);
    }
}

const resetPassword = async (req, res) => {
    try {
        const user = await userService.getUserById(req.user);
        const isOldPasswordCorrect = await user.isValidPassword(req.body.oldPassword);
        if(!isOldPasswordCorrect){
            throw {
                err: 'Invalid Old Password, please type the correct password',
                code: StatusCodes.FORBIDDEN
            }
        }

        user.password = req.body.newPassword;
        await user.save();

        successResponseBody.data = user;
        successResponseBody.message = 'Successfully reseted the password';

        return res.status(StatusCodes.OK).
        json(successResponseBody);

    } catch (error) {
        console.log(error);
        if(error.err){
        errorResponseBody.err = error.err;
        return res.status(StatusCodes.BAD_REQUEST).
        json(errorResponseBody);

        }
        errorResponseBody.err = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json(errorResponseBody);
    }
}

module.exports = {
    signup,
    signin,
    resetPassword
};