const userController = require('./../controllers/userController');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const validations = require('../middlewares/validacionesRegistroMiddleware');


const path = require('path');
const express = require('express');
const router = express.Router();

const multer = require('multer');

const configuracionFotoPerfil = multer.diskStorage({
    destination: function(req, file, cb) {
     cb(null, path.join(__dirname,'../../public/images/fotoPerfil'));
    },
    filename: function(req, file, cb) {
     let imageName =  Date.now() + file.originalname ;
     cb(null, imageName);         
    }
});

const uploadFile = multer({ storage: configuracionFotoPerfil });

//Registro
router.get('/register', guestMiddleware, userController.registrarse); //Forrmulario
router.post('/register', uploadFile.single('fotoPerfil'), validations, userController.procesoRegistro); //Proceso de registro


//LogIn
router.get('/login', guestMiddleware, userController.iniciarSesion);
router.post('/login', userController.procesoLogin); //proceso del login

//perfil de usuario
router.get('/perfil', authMiddleware, userController.perfil);

//salir de la seccion
router.get('/logout', userController.logout);  //En la vista: href="/user/logout"> 


module.exports = router;