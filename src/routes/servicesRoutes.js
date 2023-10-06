const servicesController = require('../controllers/servicesController');

const express = require('express');
const router = express.Router();

//todos los servcios
router.get('', servicesController.todosServicios);

module.exports = router;