const fs = require('fs');
const path = require('path');
let db = require('../database/models');

const mainController = {
    index: (req, res) => {
        db.Producto.findAll()
        .then((resultado)  => { 
            res.render('index', {productos: resultado});
		});
    }
}

module.exports = mainController;