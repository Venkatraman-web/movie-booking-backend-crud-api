const ShowControllers = require('../controllers/show.controller');
const ShowMiddlewares = require('../middlewares/show.middleware');
const authMiddlewares = require('../middlewares/auth.middleware');
const { Show } = require('../models/show.model');

const routes = (app) => {
    app.post('/mba/api/v1/shows', 
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient,
        ShowMiddlewares.validateCreateShowRequest,
        ShowControllers.create);

    app.get('/mba/api/v1/shows', ShowControllers.getShows);

    app.delete('/mba/api/v1/shows/:id', 
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient,
        ShowControllers.deleteShow);

    app.patch('/mba/api/v1/shows/:id', 
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient,
        ShowMiddlewares.validateUpdateShowRequest,
        ShowControllers.updateShow
    );

}

module.exports = {
    routes
};