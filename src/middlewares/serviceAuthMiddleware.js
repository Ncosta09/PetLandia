function serviceAuthMiddleware(req, res, next) {
    if(!req.session.usuarioLogeado){
        return res.redirect('/servicios');
    }

    next();
}

module.exports = serviceAuthMiddleware;