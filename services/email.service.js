const nodemailer = require('nodemailer');



const sendMail = (userId, password) => {

    const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: userId,
        pass: password
    }
    });

    transporter.sendMail({
    from: 'mba@support.com',
    to: process.env.EMAIL,
    subject: 'Test Email for NodeMailer',
    text: 'Hey, this is a test email'
    })
}


module.exports = {
    sendMail
};