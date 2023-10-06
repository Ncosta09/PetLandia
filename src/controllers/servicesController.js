let db = require('../database/models');

const servicesController = {

    todosServicios: (req, res) => {
        db.Servicio.findAll()
        .then((resultado)  => { 
            res.render('servicios', {servicios: resultado});
		});
    }

}

module.exports = servicesController;