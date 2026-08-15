const cron = require('node-cron');

const { Ticket } = require('../models/ticketNotification.model');
const { TICKET_STATUS } = require('../utils/constants');
const Mailer = require('../services/email.service');

const mailerCron = async () => {

    const mailer = Mailer.mailer(
        process.env.EMAIL,
        process.env.EMAIL_PASS
    );

    cron.schedule('*/2 * * * *', async () => {

        console.log('Executing cron again...');

        const notificationsToBeSent = await Ticket.find({
            status: TICKET_STATUS.pending
        });

        for (const notification of notificationsToBeSent) {

            const mailData = {
                from: 'mba@support.com',
                to: notification.recepientEmails,
                subject: notification.subject,
                text: notification.content
            };

            mailer.sendMail(mailData, async (err, data) => {

                if (err) {
                    console.log(err);
                } else {
                    console.log(data);

                    notification.status = TICKET_STATUS.success;

                    await notification.save();
                }

            });
        }
    });
};

module.exports = {
    mailerCron
};