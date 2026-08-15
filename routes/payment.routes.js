const PaymentControllers = require('../controllers/payment.controller');
const PaymentMiddlewares = require('../middlewares/payment.middleware');
const authMiddlewares = require('../middlewares/auth.middleware');
const { Payment } = require('../models/payment.model');

const routes = (app) => {
    app.post('/mba/api/v1/payments',
        authMiddlewares.isAuthenticated,
        PaymentMiddlewares.verifyCreatePaymentRequest,
        PaymentControllers.create
    );

    app.get('/mba/api/v1/payments/:id', 
        authMiddlewares.isAuthenticated,
        PaymentControllers.getPaymentDetailsById
    );

    app.get('/mba/api/v1/payments',
        authMiddlewares.isAuthenticated,
        PaymentControllers.getAllPayments
    );

}

module.exports = {
    routes
};