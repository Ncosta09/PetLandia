const { log } = require('console');
let db = require('../database/models');
const { Op } = require('sequelize');

const servicesController = {

    todosServicios: (req, res) => { 
        res.render('servicios');
    },

    servicio: (req, res) => { 
        res.render('turnoServicio', {usuario: req.session.usuarioLogeado});
    },

    procesoServicio: (req, res) => { 
        db.Servicio.create({
            Usuario_FK: req.session.usuarioLogeado.ID,
            Tipo_Servicio: req.body.select_turno,
            Fecha_Turno: req.body.date_turno,
            Mensaje: req.body.mensaje_turno
        })
        .then(servicio => {
            console.log('Servicio creado con éxito:', servicio);
        })
        .then(() => {
            res.redirect('/servicios');
        });
    }
}

module.exports = servicesController;