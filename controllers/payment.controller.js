const paymentService = require('../services/payment.service');
const { BOOKING_STATUS } = require('../utils/constants');
const StatusCode = require('http-status-codes');
const {StatusCodes} = StatusCode;

const {errorResponseBody, successResponseBody} = require('../utils/responsebody');


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
        successResponseBody.data = response;
        successResponseBody.message = 'Booking completed successfully';
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