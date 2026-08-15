const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5
    },
    description: {
        type: String,
    },
    city: {
        type: String,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    movies: {
        type: [mongoose.Schema.ObjectId],
        ref: 'Movie'
    }

}, {timestamps: true});

const Theatre = mongoose.model('Theatre', theatreSchema);

module.exports = {
    Theatre
}