const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2
    },
    description: {
        type: String, 
        required: true,
        minLength: 5
    },
    casts: {
        type: [String],
        required: true
    },
    trailerUrl: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true,
        default: 'English'
    },
    releaseDate: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true
    },
    releaseStatus: {
        type: String,
        required: true,
        default: 'RELEASED'
    },

}, {timestamps: true});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = {
    Movie
};