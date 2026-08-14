const TheatreController = require('../controllers/theatre.controller');
const TheatreMiddleware = require('../middlewares/theatre.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const routes = (app) => {
    app.post('/mba/api/v1/theatre', 
        authMiddleware.isAuthenticated,
        authMiddleware.isAdminOrClient,
        TheatreMiddleware.validateTheatreCreate, 
        TheatreController.create);

    app.delete('/mba/api/v1/theatre/:id', 
        authMiddleware.isAuthenticated,
        authMiddleware.isAdminOrClient, TheatreController.destroy);

    app.get('/mba/api/v1/theatre/:id', TheatreController.getTheatre);

    app.get('/mba/api/v1/theatre', TheatreController.getTheatres);

    app.put('/mba/api/v1/theatre/:id', 
        authMiddleware.isAuthenticated,
        authMiddleware.isAdminOrClient,
        TheatreController.update);
    
    app.patch('/mba/api/v1/theatre/:id', 
        authMiddleware.isAuthenticated,
        authMiddleware.isAdminOrClient,
        TheatreController.update);

    app.patch('/mba/api/v1/theatre/:id/movies', TheatreMiddleware.validateUpdateMovies, TheatreController.updateMovies);

    app.get('/mba/api/v1/theatre/:id/movies', TheatreController.getMovies);

    app.get('/mba/api/v1/theatre/:theatreId/movies/:movieId', TheatreController.checkMovie);

}


module.exports = { routes };