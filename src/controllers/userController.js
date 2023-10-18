const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
let moment = require('moment');
let db = require('../database/models');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

const User = require('../model/Usuario');
const userFilePath = path.join(__dirname, '../data/usersDataBase.json');

let user = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));

const userController = {

    registrarse: (req, res) => {
        res.render('register');
    },

    procesoRegistro: async(req, res) => {
        let validaciones = validationResult(req);

        if(validaciones.errors.length > 0){
            return res.render ('register', {
                errores: validaciones.mapped(),
                ultData: req.body
            });
        } else {

            let fechaHoraActual = moment().format("YYYY-MM-DD HH:MM:SS");
            let cloudinaryImage = '';
	
		    if (req.file) {
		    	const imageBuffer = req.file.buffer;
		    	const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
		    	const customFilename = 'usuario_' + uniqueSuffix;
		    	const folder = 'AvatarsImg';
            
		    	const stream = cloudinary.uploader.upload_stream({ resource_type: 'image', folder: folder, public_id: customFilename }, (error, result) => {
                
		    		console.log('Upload successful: ');
		    		cloudinaryImage = result.secure_url;
                
                    db.Usuario.create({
                        Nombre: req.body.nombre,
                        Apellido: req.body.apellido,
                        Password: bcryptjs.hashSync(req.body.contrasena, 10),
                        Email: req.body.email,
                        Telefono: req.body.telefono,
                        Imagen: cloudinaryImage,
                        Fecha_Creacion: fechaHoraActual,
                        Rol_FK: '1',
                        Local_FK: '1'
                    })
                    .then(()  => { 
                        res.redirect('/usuario/login');
                    });
		    	});
            
		    	streamifier.createReadStream(imageBuffer).pipe(stream);
		    }
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

    perfil: async (req,res)=>{

        let roles = await db.Rol.findAll();

        res.render('perfil', {
            usuario: req.session.usuarioLogeado, roles
        });
    },

    perfilMod: async (req, res) => {
        let updateRol = {
          Rol_FK: req.body.newRole
        };
      
        let usuarioFind = await db.Usuario.findOne({
          where: {
            Email: req.body.email
          }
        });
    
        if (usuarioFind) {
          await usuarioFind.update(updateRol);
          res.json({ success: true, message: 'Rol cambiado exitosamente' });
        } else {
          res.json({ success: false, message: 'Usuario no encontrado' });
        }
      },

    logout: (req,res)=>{
        res.clearCookie('emailUsuario');
        req.session.destroy();
        return res.redirect('/usuario/login');
    }
}

module.exports = userController;