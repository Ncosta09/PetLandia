const usuario = require('../model/Usuario')

function userLoggedMiddleware(req, res, next){
    res.locals.logeado = false;

    let emailCookie = req.cookies.emailUsuario;
    let usuarioCookie = usuario.findByField('email', emailCookie);

    if(usuarioCookie){
        req.session.usuarioLogeado = usuarioCookie;
    }

    if(req.session && req.session.usuarioLogeado){
        res.locals.logeado = true;
        res.locals.usuarioLogeado = req.session.usuarioLogeado; //chequear en video
    }

    next();
}

module.exports = userLoggedMiddleware;