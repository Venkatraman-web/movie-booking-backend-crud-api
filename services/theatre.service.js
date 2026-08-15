const { Movie } = require('../models/movie.model')
const { Theatre }= require('../models/theatre.model');

const StatusCode = require('http-status-codes');
const {StatusCodes} = StatusCode;

const createTheatre = async (data) => {
    try {
    const response = await Theatre.create(data);
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

const deleteTheatre = async (id) => {
    try {
        const response = await Theatre.findByIdAndDelete(id);
        if(!response){
            return {
                err: 'No record of theatre found for given id',
                code: StatusCodes.NOT_FOUND
            }
        }
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getTheatre = async (id) => {
    try {
        const response = await Theatre.findById(id);
        if(!response){
            return {
                err: 'No theatre found for given id',
                code: StatusCodes.NOT_FOUND
            }
        }
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getAllTheatres = async (data) => {
    try{
        let query = {};
        let pagination = {};
        if(data && data.city){
            query.city = data.city;
        }
        if(data && data.pincode){
            query.pincode = data.pincode;
        }
        if(data && data.name){
            query.name = data.name;
        }
        if(data && data.movieId){
            let movie = await Movie.findById(data.movieId);
            query.movies = {$all: movie};

        }
        if(data && data.limit){
            pagination.limit = data.limit;
        }
        if(data && data.skip){
            let perPage = (data.perPage) ? data.perPage : 3;
            pagination.skip = data.skip*perPage;
        }
        const response = await Theatre.find(query, {}, pagination);
        if(!response){
            return {
                err: 'No theatres found',
                code: StatusCodes.NOT_FOUND
            }
        }

        return response;
    }catch(error){
        console.log(error);
        throw error;

    }
}

const updateTheatre = async (id, data) => {
    try {
        const response = await Theatre.findByIdAndUpdate(id, data, {new: true, runValidators: true
        });
        if(!response){
            return {
                err: 'No theatres found',
                code: StatusCodes.NOT_FOUND
            }
        }
        return response;
    } catch (error) {
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

const updateMoviesInTheatres = async (theatreId, movieIds, insert) => {
        try {
            if(insert){
        
            await Theatre.updateOne(
                {_id: theatreId},
                {$addToSet: {movies: {$each: movieIds}}}
            );

        }else{
            // remove movies from theatre
            await Theatre.updateOne(
                {_id: theatreId},
                {$pull: {movies: {$in: movieIds}}}
            );
        }

        const theatre = await Theatre.findById(theatreId);
        // await theatre.save();
        return theatre.populate('movies');

        } catch (error) {
            if(error.name == 'TypeError'){
                return {
                    code: StatusCodes.NOT_FOUND,
                    err: 'No theatre found for given id'
                }
            }
            console.log(error);
            throw error;
        }
        
}

const getMoviesInATheatre = async (theatreId) => {
    try {
        const theatre = await Theatre.findById(theatreId, {name:1, movies:1, address: 1}).populate('movies');
        if(!theatre){
            return {
                err: 'No theatre with given id found',
                code: StatusCodes.NOT_FOUND
            }
        }
        return theatre;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const checkMovieInATheatre = async (theatreId, movieId) => {
    try {
        const response = await Theatre.findById(theatreId);
        if(!response){
            return {
                err: 'No such theatre found for given id',
                code: StatusCodes.NOT_FOUND
            }
        }
        return response.movies.indexOf(movieId) != -1;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    createTheatre,
    deleteTheatre,
    getTheatre,
    getAllTheatres,
    updateTheatre,
    updateMoviesInTheatres,
    getMoviesInATheatre,
    checkMovieInATheatre
};