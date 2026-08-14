const MovieController = require('../controllers/movie.controller');
const MovieMiddlewares = require('../middlewares/movie.middleware');
const authMiddlewares = require('../middlewares/auth.middleware');

const routes = (app) => {
    app.post('/mba/api/v1/movies', 
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient,
        MovieMiddlewares.validateMovieCreateRequest, 
        MovieController.createMovie);

    app.delete('/mba/api/v1/movies/:id', 
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient,
        MovieController.deleteMovie);

    app.get('/mba/api/v1/movies/:id', MovieController.getMovie);

    app.put('/mba/api/v1/movies/:id', 
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient,
        MovieController.updateMovie);

    app.patch('/mba/api/v1/movies/:id', 
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient,
        MovieController.updateMovie);

    app.get('/mba/api/v1/movies', MovieController.getMovies);
}

module.exports = { routes };