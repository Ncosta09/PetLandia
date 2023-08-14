const userController = require('./../controllers/userController');
const User = require('../model/Usuario');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');


const path = require('path');
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');


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

const validations = [
    body('nombre').notEmpty().withMessage('Escribir un Nombre valido'),
    body('apellido').notEmpty().withMessage('Escribir un Apellido valido'),
    body('email').notEmpty().withMessage('Escribir un email valido').bail().isEmail()
    .withMessage('Debes escribir un formato de correo valido').bail().custom((value, { req }) => {
        let mailExistente = User.findByField('email', req.body.email);

        if(mailExistente){
            throw new Error('Este correo ya se encuentra registrado');
        }
        
        return true;
    }),
    body('contrasena').notEmpty().withMessage('Se require contraseña').bail()
    .isLength({ min: 5 }).withMessage('La contraseña debe contener al menos 5 caracteres'), 
    body('confirmarContrasena').custom((value, { req }) => {
      if (value !== req.body.contrasena) {
        throw new Error('Las contraseñas no coinciden');
      }

      return true;

    }),
    body('fotoPerfil').custom((value, {req}) => {
        let file = req.file;
        let extencionesPass = ['.jpg', '.png', '.jpeg'];

        if(!file){
            throw new Error('Tenes que subir una imagen');
        }
        else{

            let fileExtencion = path.extname(file.originalname);
            if(!extencionesPass.includes(fileExtencion)){
                throw new Error('La extencion del archivo no es la permitida');
            }    
        }

        return true;
    })
]

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