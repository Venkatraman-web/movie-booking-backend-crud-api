const { Show } = require('../models/show.model');
const { Theatre } = require('../models/theatre.model');

const StatusCode = require('http-status-codes');
const {StatusCodes} = StatusCode;

const createShow = async (data) => {
    try {
    const theatre = await Theatre.findById(data.theatreId);
    if(!theatre){
        throw {
            err: 'No theatre found',
            code: StatusCodes.NOT_FOUND
        }
    }
    if(theatre.movies.indexOf(data.movieId) == -1){
        throw {
                    err: 'Movie with this id is not running in the theatre',
                    code: StatusCodes.NOT_FOUND
                }
    }
    const response = await Show.create(data);
        return response;

    } catch (error) {
            console.log(error);
            if(error.name == "ValidationError"){
                let err = {};
                Object.keys(error.errors).forEach((key) => {
                    err[key] = error.errors[key].message;
                });
                console.log(err);
                return {err: err, code: StatusCodes.UNPROCESSABLE_ENTITY};
            }else{
            throw error;

            }
    }
}

const getShows = async (data) => {
    try {
        const filter = {};
        if(data.movieId){
            filter.movieId = data.movieId;
        }
        if(data.theatreId){
            filter.theatreId = data.theatreId;
        }
        const response = await Show.find(filter);
        if(!response){
            throw {
                err: 'No shows found',
                code: StatusCodes.NOT_FOUND
            }
        }
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteShow = async (id) => {
    try {
        const response = await Show.findByIdAndDelete(id);
        if(!response){
            throw {
                err: 'No shows found',
                code: StatusCodes.NOT_FOUND
            }
        }
        return response;
    } catch (error) {
        throw error;
    }
}

const updateShow = async (id, data) => {
    try {
        const response = await Show.findByIdAndUpdate(id, data, {new:true, runValidators: true});
        if(!response){
            throw {
                err: 'No shows found',
                code: StatusCodes.NOT_FOUND
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
                return {err: err, code: StatusCodes.UNPROCESSABLE_ENTITY};
            }else{
            throw error;

            }
    }
}

module.exports = {
    createShow,
    getShows,
    deleteShow,
    updateShow
};