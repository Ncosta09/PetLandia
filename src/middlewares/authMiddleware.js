function authMiddleware(req, res, next) {
    if(!req.session.usuarioLogeado){
        return res.redirect('/usuario/login');
    }

    next();
}

module.exports = authMiddleware;