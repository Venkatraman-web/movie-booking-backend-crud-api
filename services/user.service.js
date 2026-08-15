const { User } = require('../models/user.model.js');
const { USER_STATUS, USER_ROLE } = require('../utils/constants.js');

const { approved, pending, rejected } = USER_STATUS;
const { customer, client, admin } = USER_ROLE;

const StatusCode = require('http-status-codes');
const {StatusCodes} = StatusCode;

const createUser = async (data) => {
    try {
        if(!data.userRole || data.userRole == customer){
            if(data.userStatus && data.userStatus != approved){
                throw {
                    err: 'We cannot set any other status for customer',
                    code: StatusCodes.BAD_REQUEST
                };
            }
        }

        if(data.userRole && data.userRole != customer){
                data.userStatus = pending;
        }

        const response = await User.create(data);
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

const getUserByEmail = async (email) => {
    try {
        const response = await User.findOne({
            email: email
        });
        if(!response){
            throw {
                err: 'No user found for given email',
                code: StatusCodes.NOT_FOUND
            }
        }
        return response;
    } catch (error) {
            console.log(error);
            throw error;

    }
}

const getUserById = async (id) => {
    try {
        const user = await User.findById(id);
        if(!user){
            throw {
                err: 'No user found from given id',
                code: StatusCodes.NOT_FOUND
            }
        }
        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateUserRoleOrStatus = async (data, userId) => {
    try {
        const update = {};

        if (data.userRole !== undefined) {
            update.userRole = data.userRole;
        }

        if (data.userStatus !== undefined) {
            update.userStatus = data.userStatus;
        }

        const response = await User.findByIdAndUpdate(
            userId,
            update,
            {
                new: true,
                runValidators: true
            }
        );

        if (!response) {
            throw {
                err: 'Not able to find user with that id',
                code: StatusCodes.NOT_FOUND
            };
        }

        return response;

    } catch (error) {
        console.log(error);

        if (error.name === 'ValidationError') {
            const err = {};

            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });

            throw {
                err: err,
                code: StatusCodes.UNPROCESSABLE_ENTITY
            };
        }

        throw error;
    }
};

module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    updateUserRoleOrStatus
};