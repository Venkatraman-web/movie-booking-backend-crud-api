const nodemailer = require('nodemailer');

const mailer = (userId, password) => {

    return nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: userId,
        pass: password
    }
    });

}


module.exports = {
    mailer
};