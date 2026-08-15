const {Payment}  = require('../models/payment.model');
const {Booking} = require('../models/booking.model');
const { BOOKING_STATUS, PAYMENT_STATUS, USER_ROLE } = require('../utils/constants');
const { User } = require('../models/user.model');
const { Show } = require('../models/show.model');

const createPayment = async (data) => {
    try {
    const booking = await Booking.findById(data.bookingId);
    const show = await Show.findOne({
        movieId: booking.movieId,
        theatreId: booking.theatreId,
        timing: booking.timing
    });

    if(booking.status == BOOKING_STATUS.successful){
        throw {
            err: 'Booking already done, cannot make a new payment against it',
            code: 404,
        }
    }
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

    if(payment.amount != booking.totalCost){
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

    show.noOfSeats -= data.noOfSeats;
    await show.save();

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

const getPaymentById = async (id) => {
    try{
        const payment = await Payment.findById(id).populate({
            path: 'bookingId',
            options: {strictPopulate: false}
        });
    if(!payment){
        return {
            err: 'No payment for given id',
            code: 404
        }
    }
    return payment;
    }catch(error){
        console.log(error);
        throw error;
    }
    
}

const getAllPayments = async (userId) => {
    try{
        const user = await User.findById(userId);

        let filter = {};
        if(user.userRole != USER_ROLE.admin){
            filter.userId = userId;
        }
        const bookings = await Booking.find(filter, '_id');

        const bookingIds = bookings.map(booking => booking._id);

        const payments = await Payment.find({
            bookingId: { $in: bookingIds }
        });

        return payments;

    }catch(error){
        console.log(error);
        throw error;
    }

}


module.exports = {
    createPayment,
    getPaymentById,
    getAllPayments
};