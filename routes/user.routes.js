const UserController = require('../controllers/user.controller');
const UserMiddleware = require('../middlewares/user.middleware');
const AuthMiddleware = require('../middlewares/auth.middleware');

const routes = (app) => {

    app.patch('/mba/api/v1/user/:id', AuthMiddleware.isAuthenticated, UserMiddleware.validateUpdateUserRequest, AuthMiddleware.isAdmin, UserController.update);

}

module.exports = {
    routes
};