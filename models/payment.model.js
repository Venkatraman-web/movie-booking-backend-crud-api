const mongoose = require('mongoose');

const {PAYMENT_STATUS} = require('../utils/constants');
const {failed, success, pending} = PAYMENT_STATUS;

const paymentSchema = mongoose.Schema({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Booking'
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: [failed, success, pending],
            message: 'Invalid payment status'
        },
        default: pending
    }
}, {timestamps: true});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = {
    Payment
};