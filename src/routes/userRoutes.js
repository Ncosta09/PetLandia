const userController = require('./../controllers/userController')

const express = require('express');
const router = express.Router();

router.get('/register',userController.registrarse);

router.get('/login',userController.iniciarSesion);

module.exports = router;