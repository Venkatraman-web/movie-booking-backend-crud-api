const StatusCode = require('http-status-codes');
const {StatusCodes} = StatusCode;

const userService = require('../services/user.service');
const {errorResponseBody, successResponseBody} = require('../utils/responsebody');

const update = async (req, res) => {
    try {
        const response = await userService.updateUserRoleOrStatus(
            req.body,
            req.params.id
        );

        return res.status(StatusCodes.OK).json({
            success: true,
            data: response,
            message: 'Successfully updated user'
        });

    } catch (error) {
        console.log(error);

        if (error.err) {
            return res.status(error.code || StatusCodes.BAD_REQUEST).json({
                success: false,
                err: error.err,
                data: {},
                message: 'Something went wrong, cannot process this request'
            });
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            err: error,
            data: {},
            message: 'Something went wrong, cannot process this request'
        });
    }
};

module.exports = {
    update
};