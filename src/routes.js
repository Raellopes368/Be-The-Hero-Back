const { Router } = require('express');
const OngController = require('./app/controllers/OngController');
const ProfileController = require('./app/controllers/ProfileController');
const IncidentController = require('./app/controllers/IncidentController');
const SessionController = require('./app/controllers/SessionController');

const routes = Router();


routes.post('/ongs', OngController.store);
routes.get('/ongs', OngController.index);
routes.post('/sessions', SessionController.store);
routes.get('/profiles', ProfileController.index);
routes.post('/incidents', IncidentController.store);
routes.get('/incidents', IncidentController.index);
routes.delete('/incidents/:id', IncidentController.destroy);


module.exports = routes;
