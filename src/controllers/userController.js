const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const userFilePath = path.join(__dirname, '../data/usersDataBase.json');
let user = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));

const userController = {

    registrarse: (req, res) => {
        res.render('register');
    },

    procesoRegistro: (req, res) => {
        let validaciones = validationResult(req);

        if(validaciones.errors.length > 0){
            return res.render ('register', {
                errores: validaciones.mapped(),
                ultData: req.body
            });
        } else {

            let datosFormulario = req.body;
            let idNuevoUsuario = (user[user.length - 1].id) + 1;
    
            let nombreImagen = req.file.filename;
    
            let objNuevoUsuario = {
                id: idNuevoUsuario,
                name: datosFormulario.nombre,
                surname: datosFormulario.apellido,
                email: datosFormulario.email,
                password: bcrypt.hashSync(datosFormulario.contrasena, 10),
                image: nombreImagen
            }
    
            user.push(objNuevoUsuario);
            fs.writeFileSync(userFilePath, JSON.stringify(user, null, ' '));
            res.redirect('/');
        }
    },

    iniciarSesion: (req, res) => {
        res.render('login');
    }
}

module.exports = userController;