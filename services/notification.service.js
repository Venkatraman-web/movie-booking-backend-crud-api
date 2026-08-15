const { Ticket } = require('../models/ticketNotification.model');

const create = async (data) => {
    try {
        const ticket = await Ticket.create(data);
        return ticket;
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

const getAll = async () => {
    try {
        const response = await Ticket.find();
        return response;
    } catch (error) {
        throw error;
    }
}

const getById = async (id) => {
    try {
        const response = await Ticket.findById(id);
        if(!response){
            throw {
                err: 'No notfications found for given id',
                code: 404
            }
        }

        return response;

    } catch (error) {
        throw error;
    }
}

module.exports = {
    create,
    getAll,
    getById
};