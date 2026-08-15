const errorResponseBody = {
    err: {},
    data: {},
    message: "Something went wrong, cannot process this request",
    success: false,
}

const successResponseBody = {
    err: {},
    data: {},
    message: 'Successfully processed the request',
    success: true,
}

module.exports = {
    errorResponseBody,
    successResponseBody
};



