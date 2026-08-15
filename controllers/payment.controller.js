const paymentService = require('../services/payment.service');
const { BOOKING_STATUS } = require('../utils/constants');
const StatusCode = require('http-status-codes');
const {StatusCodes} = StatusCode;
const axios = require('axios');

const {errorResponseBody, successResponseBody} = require('../utils/responsebody');
const { User } = require('../models/user.model');
const { Movie } = require('../models/movie.model');
const { Theatre } = require('../models/theatre.model');


const create = async (req, res) => {
    try {
        
        const response = await paymentService.createPayment(req.body);

        if(response.status == BOOKING_STATUS.expired){
                    errorResponseBody.err = 'Payment got expired as it took you to make payment for more than 5 mins';
                    errorResponseBody.message = 'Expired Booking';
                    return res.status(response.code).
                    json(errorResponseBody);
        
                }

        if(response.status == BOOKING_STATUS.cancelled){
                    errorResponseBody.err = 'Payment got failed to due some reason';
                    errorResponseBody.message = 'Cancelled Booking';
                    return res.status(response.code).
                    json(errorResponseBody);
        
            }
            const user = await User.findById(response.userId);
            const movie = await Movie.findById(response.movieId);
            const theatre = await Theatre.findById(response.theatreId);
        
        successResponseBody.data = response;
        successResponseBody.message = 'Payment completed successfully';

        axios.post(process.env.NOTI_SERVICE + '/notiservice/api/v1/notifications', {
            subject: 'Your booking is Succesful',
            recepientEmails: [...recepientEmails, user.email],
            content: `Your booking for ${movie.name} in ${theatre.name} for ${response.noOfSeats} seats on ${response.timing} is successful. Your booking id is ${response.id}`
        });

        return res.status(StatusCodes.OK).
        json(successResponseBody);

    } catch (error) {
        if(error.err){
        errorResponseBody.err = error.err;
return res.status(err.code).
        json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json(errorResponseBody);
    }
}

const getPaymentDetailsById = async (req, res) => {
    try{
            const response = await paymentService.getPaymentById(req.params.id);
            if(response.err){
                errorResponseBody.err = response.err;
                return res.status(response.code).
                json(errorResponseBody);
            }
            successResponseBody.data = response;
            return res.status(StatusCodes.OK).json(successResponseBody);
    
        }catch(err){
            console.log(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).
            json(errorResponseBody);
        }
}

const getAllPayments = async (req, res) => {
    try {
        const response = await paymentService.getAllPayments(req.user);

        successResponseBody.data = response;
        successResponseBody.message = 'Successfully fetched all payments for the user';
        return res.status(StatusCodes.OK).
        json(successResponseBody);

    } catch (error) {
        if(error.err){
        errorResponseBody.err = error.err;
return res.status(err.code).
        json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json(errorResponseBody);
    }
}

module.exports = {
    create,
    getPaymentDetailsById,
    getAllPayments
};