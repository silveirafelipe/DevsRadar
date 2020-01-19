const { Router } = require('express');
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')


const routes = Router();

routes.get('/search', SearchController.index);

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.post('/updateDevs', DevController.update);
routes.post('/deleteDevs', DevController.destroy);

module.exports = routes;