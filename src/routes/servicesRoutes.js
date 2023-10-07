const servicesController = require('../controllers/servicesController');

const serviceAuthMiddleware = require('../middlewares/serviceAuthMiddleware');

const express = require('express');
const router = express.Router();

//todos los servcios
router.get('', servicesController.todosServicios);

router.get('/solicitud/turno', serviceAuthMiddleware, servicesController.servicio);
router.post('/solicitud/turno', servicesController.procesoServicio);

module.exports = router;