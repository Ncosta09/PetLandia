const User = require('../model/Usuario');
const path = require('path');
const { body } = require('express-validator');

module.exports = [
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