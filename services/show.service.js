const { Show } = require('../models/show.model');
const { Theatre } = require('../models/theatre.model');

const createShow = async (data) => {
    try {
    const theatre = await Theatre.findById(data.theatreId);
    if(!theatre){
        throw {
            err: 'No theatre found',
            code: 404
        }
    }
    if(theatre.movies.indexOf(data.movieId) == -1){
        throw {
                    err: 'Movie with this id is not running in the theatre',
                    code: 404
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
                return {err: err, code: 422};
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
                code: 404
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
                code: 404
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

module.exports = {
    createShow,
    getShows,
    deleteShow,
    updateShow
};