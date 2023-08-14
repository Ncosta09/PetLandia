const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');

const User = require('../model/Usuario');
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
                password: bcryptjs.hashSync(datosFormulario.contrasena, 10),
                image: nombreImagen
            }
    
            user.push(objNuevoUsuario);
            fs.writeFileSync(userFilePath, JSON.stringify(user, null, ' '));
            res.redirect('/usuario/login');
        }
    },

    iniciarSesion: (req, res) => {
        res.render('login');
    },

    procesoLogin: (req,res) => {
        let usuarioLogin = User.findByField('email', req.body.email);
        
        if(usuarioLogin){
            let contrasenaCorrecta = bcryptjs.compareSync(req.body.contrasena, usuarioLogin.password); //password hace referencia a como se guardo en el JSON

            if(contrasenaCorrecta){
                delete usuarioLogin.password;
                req.session.usuarioLogeado = usuarioLogin;

                if(req.body.recordarUsuario){
                    res.cookie('emailUsuario', req.body.email, { maxAge: (1000 * 60) * 2 });
                }

                return res.redirect('/usuario/perfil');

            } else{
                return res.render('login', {
                    errores: {
                        email: {
                            msg: 'Las credenciales son incorrectas'
                        }
                    }
                });
            }
        }

        return res.render('login', {
            errores: {
                email: {
                    msg: 'Este correo no se encuentra registrado'
                }
            }
        });
    },

    perfil: (req,res)=>{
        res.render('perfil', {
            usuario: req.session.usuarioLogeado
        });
    },

    logout: (req,res)=>{
        res.clearCookie('emailUsuario');
        req.session.destroy();
        return res.redirect('/usuario/login');
    }
}

module.exports = userController;