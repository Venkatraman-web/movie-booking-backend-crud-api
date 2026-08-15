const NotificationController = require('../controllers/ticket.controller');
const NotificationMiddleware = require('../middlewares/ticket.middleware');

const routes = (app) => {
    app.post('/notiservice/api/v1/notifications',
        NotificationMiddleware.verifyTicketNotificationCreateRequest,
        NotificationController.createTicket
    );

    app.get('/notiservice/api/v1/notifications', NotificationController.getAllTickets);

    app.get('/notiservice/api/v1/notifications/:id', NotificationController.getTicketById);

}

module.exports = {
    routes
};