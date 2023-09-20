const User = require('../model/Usuario');
const path = require('path');
const { body } = require('express-validator');

module.exports = [
    body('nombre').notEmpty().withMessage('El campo Nombre es obligatorio'),
    body('apellido').notEmpty().withMessage('El campo Apellido es obligatorio'),
    body('telefono').notEmpty().withMessage('Ingresa un número de teléfono válido'),
    body('email').notEmpty().withMessage('Ingresa un correo electrónico válido').bail().isEmail()
    .withMessage('Debes escribir un formato de correo valido').bail().custom((value, { req }) => {
        let mailExistente = User.findByField('email', req.body.email);

        if(mailExistente){
            throw new Error('Este correo ya se encuentra registrado');
        }
        
        return true;
    }),
    body('contrasena').notEmpty().withMessage('El campo contraseña es obligatorio').bail()
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
            throw new Error('Debes seleccionar una foto de perfil');
        }
        else{

            let fileExtencion = path.extname(file.originalname);
            if(!extencionesPass.includes(fileExtencion)){
                throw new Error('La foto de perfil contiene una extencion no permitida');
            }    
        }

        return true;
    })
]