const StatusCode = require('http-status-codes');
const {StatusCodes} = StatusCode;

const showService = require('../services/show.service');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody');
const { resetPassword } = require('./auth.controller');

const create = async (req, res) => {
    try {
        const response = await showService.createShow(req.body);
        if(response.err){
            errorResponseBody.err = response.err;
            errorResponseBody.message = 'Validation failed on few parameters of the request body';
            return res.status(response.code).
            json(errorResponseBody);

        }
        successResponseBody.data = response;
        successResponseBody.message = 'Successfully created the show';
        return res.status(StatusCodes.OK).
        json(successResponseBody);
    } catch (error) {
        errorResponseBody.err = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json(errorResponseBody);
    }
}

const getShows = async (req, res) => {
    try {
        const response = await showService.getShows(req.body);

        // if(response.err){
        //     errorResponseBody.err = response.err;
        //     errorResponseBody.message = 'Validation failed on few parameters of the request body';
        //     return res.status(response.code).
        //     json(errorResponseBody);

        // }

        successResponseBody.data = response;
        successResponseBody.message = 'Successfully got the all shows for respective moveId and theatreId';
        return res.status(StatusCodes.OK).
        json(successResponseBody);
    } catch (error) {
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

const deleteShow = async (req, res) => {
    try {
        const response = await showService.deleteShow(req.params.id);

        successResponseBody.data = response;
        successResponseBody.message = 'Successfully deleted the show with show id';
        return res.status(StatusCodes.OK).
        json(successResponseBody);

    } catch (error) {
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

const updateShow = async (req, res) => {
    try {
        
        const response = await showService.updateShow(req.params.id, req.body);

        successResponseBody.data = response;
        successResponseBody.message = 'Successfully updated the show with show id';
        return res.status(StatusCodes.OK).
        json(successResponseBody);
    } catch (error) {
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

module.exports = {
    create,
    getShows,
    deleteShow,
    updateShow
};