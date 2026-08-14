const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const routes = (app) => {
    
    app.post('/mba/api/v1/auth/signup', authMiddleware.validateSignUpRequest, authController.signup);
    
    app.post('/mba/api/v1/auth/signin', authMiddleware.validateSignInRequest, authController.signin);

    app.patch('/mba/api/v1/auth/reset', authMiddleware.isAuthenticated, authMiddleware.validateRestPasswordRequest, authController.resetPassword);
    

}

module.exports = {
    routes
};