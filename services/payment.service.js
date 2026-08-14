const {Payment}  = require('../models/payment.model');
const {Booking} = require('../models/booking.model');
const { BOOKING_STATUS, PAYMENT_STATUS } = require('../utils/constants');

const createPayment = async (data) => {
    try {
    const booking = await Booking.findById(data.bookingId);
    if(!booking){
        throw {
            err: 'No theatre found',
            code: 404
        }
    }
    
    let bookingTime = booking.createdAt;
    let currentTime = Date.now();

    let minutes = Math.floor((currentTime-bookingTime)/1000/60);
    if(minutes>5){
        booking.status = BOOKING_STATUS.expired;
        await booking.save();
        return booking;
    }

    const payment = await Payment.create({
        bookingId: data.bookingId,
        amount: data.amount
    });

    if(payment.amount > booking.totalCost){
        payment.status = PAYMENT_STATUS.failed;
        await payment.save();
    }
        
    if(!payment || payment.status == PAYMENT_STATUS.failed){
        payment.status = PAYMENT_STATUS.failed;
        await payment.save();

        booking.status = BOOKING_STATUS.cancelled;
        await booking.save();
        return booking;
    }

    payment.status = PAYMENT_STATUS.success;
    await payment.save();

    booking.status = BOOKING_STATUS.successful;
    await booking.save();
    
    return booking;

    } catch (error) {
            console.log(error);
            if(error.name == "ValidationError"){
                let err = {};
                Object.keys(error.errors).forEach((key) => {
                    err[key] = error.errors[key].message;
                });
                console.log(err);
                return {err: err, code: 422};
            }else{
            throw error;

            }
    }
}


module.exports = {
    createPayment
};