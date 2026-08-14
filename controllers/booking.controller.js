const {errorResponseBody, successResponseBody} = require('../utils/responsebody');
const bookingService = require('../services/booking.service');

const create = async (req, res) => {
    try {
        const userId = req.user;
        const response = await bookingService.createBooking(req.body, userId);

        successResponseBody.data = response;
        successResponseBody.message = 'Successfully created a booking';
        return res.status(201).
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

const update = async (req, res) => {
    try {
        const response = await bookingService.updateBooking(req.body, req.params.id);

        successResponseBody.data = response;
        successResponseBody.message = 'Successfully updated data of booking';
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

const getBookings = async (req, res) => {
    try {
        const response = await bookingService.getBookings({userId: req.user});

        successResponseBody.data = response;
        successResponseBody.message = 'Successfully updated data of booking';
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

const getAllBookings = async (req, res) => {
    try {
        const response = await bookingService.getAllBookings();

        successResponseBody.data = response;
        successResponseBody.message = 'Successfully updated data of booking';
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

const getBookingById = async (req, res) => {
    try {
        const response = await bookingService.getBookingById(req.params.id, req.user);
        successResponseBody.data = response;
        successResponseBody.message = 'Successfully got booking of that id';
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
    create,
    update,
    getBookings,
    getAllBookings,
    getBookingById
};