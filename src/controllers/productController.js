const productController = {

    productoDetalle: (req, res) => {
        res.render('producto');
    },

    carrito: (req, res) => {
        res.render('carrito');
    }
}

module.exports = productController;