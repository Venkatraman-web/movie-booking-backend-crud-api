const BookingController = require('../controllers/booking.controller');
const BookingMiddlewares = require('../middlewares/booking.middleware');
const authMiddlewares = require('../middlewares/auth.middleware');

const routes = (app) => {
    app.post('/mba/api/v1/booking', 
        authMiddlewares.isAuthenticated,
        BookingMiddlewares.validateBookingCreateRequest,
        BookingController.create);

    app.patch('/mba/api/v1/booking/:id', 
        authMiddlewares.isAuthenticated,
        BookingMiddlewares.canChangeStatus,
        BookingController.update);

    app.get('/mba/api/v1/booking',
        authMiddlewares.isAuthenticated,
        BookingController.getBookings
    );

    app.get('/mba/api/v1/booking/all',
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdmin,
        BookingController.getAllBookings
    );

    app.get('/mba/api/v1/booking/:id', 
        authMiddlewares.isAuthenticated,
        BookingController.getBookingById
    );
    
}

module.exports = {
    routes
};