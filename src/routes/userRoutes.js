const userController = require('./../controllers/userController');

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
    body('email').notEmpty().withMessage('Escribir un email valido').bail().isEmail().withMessage('Debes escribir un formato de correo valido'),
    body('contrasena').isLength({ min: 5 }),
    body('confirmarContrasena').custom((value, { req }) => {
      if (value !== req.body.contrasena) {
        throw new Error('Las contraseñas no coinciden');
      }

      return true;

    }),
    body('fotoPerfil').custom((value, {req}) => {
        let file = req.file;
        let extencionesPass = ['.jpg', '.png'];

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
router.get('/register',userController.registrarse); //Forrmulario
router.post('/register', uploadFile.single('fotoPerfil'), validations, userController.procesoRegistro); //Proceso de registro


//LogIn
router.get('/login',userController.iniciarSesion);

module.exports = router;