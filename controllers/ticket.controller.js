const StatusCode = require('http-status-codes');
const {StatusCodes} = StatusCode;

const notificationService = require('../services/notification.service');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody');

const createTicket = async (req, res) => {
    try {
        const response = await notificationService.create(req.body);

        successResponseBody.data = response;
        successResponseBody.message = 'Successfully created the notification ticket';
        return res.status(StatusCodes.OK).
        json(successResponseBody);

    } catch (error) {
        errorResponseBody.err = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json(errorResponseBody);
    }
}

const getAllTickets = async (req, res) => {
    try {
        const response = await notificationService.getAll();

        successResponseBody.data = response;
        successResponseBody.message = 'Successfully got all tickets';
        return res.status(200).
        json(successResponseBody);

    } catch (error) {
        console.log(error);
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).
            json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(500).
        json(errorResponseBody);
    }
}

const getTicketById = async (req, res) => {
    try {
        const response = await notificationService.getById(req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = 'Successfully got ticket of that id';
        return res.status(200).
        json(successResponseBody);
    } catch (error) {
        console.log(error);
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).
            json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(500).
        json(errorResponseBody);
    }
}


module.exports = {
    createTicket,
    getAllTickets,
    getTicketById
};