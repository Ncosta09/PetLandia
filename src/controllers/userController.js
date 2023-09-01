const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
let moment = require('moment');
let db = require('../database/models');

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

            let fechaHoraActual = moment().format("YYYY-MM-DD HH:MM:SS");

            db.Usuario.create({
                Nombre: req.body.nombre,
                Apellido: req.body.apellido,
                Password: bcryptjs.hashSync(req.body.contrasena, 10),
                Email: req.body.email,
                Telefono: req.body.telefono,
                Imagen: req.file.filename,
                Fecha_Creacion: fechaHoraActual,
                Rol_FK: '3',
                Local_FK: '1'
            })
            .then(()  => { 
                res.redirect('/usuario/login');
            });
        }
    },

    iniciarSesion: (req, res) => {
        res.render('login');
    },

    procesoLogin: (req,res) => {

        db.Usuario.findOne({
            where: {
                Email: req.body.email
            }
        })
        .then(usuarioLogin => {
            if(usuarioLogin){
                let contrasenaCorrecta = bcryptjs.compareSync(req.body.contrasena, usuarioLogin.Password); //password hace referencia a como se guardo en la DB
    
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
            })
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