const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const modeloUsuario = require('../model/Usuario.js');
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
    },

    loginProcess: (req,res)=> {
        let userToLogin = modeloUsuario.findByField('email', req.body.email);
        console.log("usuario logueado 51",userToLogin)
        if(userToLogin){
            let isOkPassword = bcrypt.compareSync(req.body.password, userToLogin.password);
            console.log("password ? 54", isOkPassword)
            if (isOkPassword){
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
                return res.redirect('user/perfil');
            }
            return res.render('login', {
                errors:{
                    email:{
                        msg:'Las credenciales son invalidas'
                    }
                }
            })
        }
        return res.render('login', {
            errors:{
                email:{
                    msg:'No se encuentra este email en nuestra base de datos'
                }
            }
        })
    },

    profile: (req,res)=>{
        return res.render('perfil',{
            user: req.session.userToLogin
        })
    },
    logout: (req,res)=>{
        req.session.destroy();
        return res.redirect('/');
    }
}

module.exports = userController;