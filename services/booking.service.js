const {Booking} = require('../models/booking.model');

const createBooking = async (data) => {
    try {
        const response = await Booking.create(data);
        return response;
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

const updateBooking = async (data, bookingId) => {
    try {
        const response = await Booking.findByIdAndUpdate(bookingId, data, {new: true, runValidators: true});

        if(!response){
            throw {
                err: 'could not update as id not present',
                code: 404
            }
        }
        
        return response;
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

const getBookings = async (data) => {
    try {
        const response = await Booking.find({
            userId: data.userId
        });
        return response;
    } catch (error) {
        throw error;
    }
}

const getAllBookings = async () => {
    try {
        const response = await Booking.find();
        return response;
    } catch (error) {
        throw error;
    }
}

const getBookingById = async (id, userId) => {
    try {
        const response = await Booking.findById(id);
        if(!response){
            throw {
                err: 'No bookings found for given id',
                code: 404
            }
        }

        if(response.userId != userId){
            throw {
                err: 'Not able to access the booking',
                code: 404
            }
        }

        return response;

    } catch (error) {
        throw error;
    }
}

module.exports = {
    createBooking,
    updateBooking,
    getBookings,
    getAllBookings,
    getBookingById
};

