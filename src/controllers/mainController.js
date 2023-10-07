const fs = require('fs');
const path = require('path');
let db = require('../database/models');

const mainController = {
    index: (req, res) => {
        db.Producto.findAll()
        .then((resultado)  => { 
            res.render('index', {productos: resultado, usuario: req.session.usuarioLogeado});
		});
    },

    todosProductos: async (req, res) => {
        
        let categorias = await db.Categoria.findAll();
		let animales = await db.Animal.findAll();
		let marcas = await db.Marca.findAll();
        let productos = await db.Producto.findAll();

        res.render('todosProductos', {productos, marcas, animales, categorias, usuario: req.session.usuarioLogeado});
    },

    productosXcategoria: async (req, res) => {
		let nombreAnimal = req.params.idCategoria;

        if(nombreAnimal == 'Perro'){
            idAnimal = 1;
        }else if(nombreAnimal == 'Gato'){
            idAnimal = 2;
        }else if(nombreAnimal == 'Roedor'){
            idAnimal = 3;
        }else if(nombreAnimal == 'Ave'){
            idAnimal = 4;
        }else if(nombreAnimal == 'Pez'){
            idAnimal = 5;
        }

        let productos = await db.Producto.findAll({ 
            where: { 
                Animal_FK: idAnimal
            }
        });
		let categorias = await db.Categoria.findAll();
		let animales = await db.Animal.findAll();
		let marcas = await db.Marca.findAll();

		res.render('productoCategoria', {productoXcategoria: productos, categorias, animales, marcas, usuario: req.session.usuarioLogeado});
    }
}

module.exports = mainController;