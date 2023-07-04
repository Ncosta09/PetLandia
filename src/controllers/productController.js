const productController = {

    productoDetalle: (req, res) => {
        res.render('producto');
    },

    carrito: (req, res) => {
        res.render('carrito');
    },

    crearArticulo: (req, res) => {
        res.render('crear');
    }
}

module.exports = productController;