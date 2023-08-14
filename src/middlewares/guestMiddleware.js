function guestMiddleware(req, res, next) {
    if(req.session.usuarioLogeado){
        return res.redirect('/usuario/perfil');
    }

    next();
}

module.exports = guestMiddleware;