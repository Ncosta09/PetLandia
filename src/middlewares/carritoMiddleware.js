carritoMiddleware
function carritoMiddleware(req, res, next) {
    if(!req.session.usuarioLogeado){
        return res.redirect('/usuario/login');
    }

    next();
}

module.exports = carritoMiddleware;