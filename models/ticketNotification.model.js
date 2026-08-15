const mongoose = require('mongoose');

const {TICKET_STATUS} = require('../utils/constants');

const ticketNotificationSchema = mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    recepientEmails: {
        type: [String],
        required: true
    },
    status: {
        type: String,
        enum: {
            values: [TICKET_STATUS.failed, TICKET_STATUS.pending, TICKET_STATUS.success],
            message: 'Invalid ticket status'
        },
        default: TICKET_STATUS.pending,
        required: true
    }

}, {timestamps: true});

const Ticket = mongoose.model('Ticket', ticketNotificationSchema);

module.exports = {
    Ticket
};