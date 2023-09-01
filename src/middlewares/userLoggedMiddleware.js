let db = require('../database/models');
const usuario = require('../model/Usuario')

function userLoggedMiddleware(req, res, next){
    
    res.locals.logeado = false;
    let emailCookie = req.cookies.emailUsuario;
    
    if (emailCookie) {

        db.Usuario.findOne({
            where: {
                Email: emailCookie
            }
        })
        .then(usuarioCookie => {

            if (usuarioCookie) {
                req.session.usuarioLogeado = usuarioCookie;
            }
    
            if (req.session && req.session.usuarioLogeado) {
                res.locals.logeado = true;
                res.locals.usuarioLogeado = req.session.usuarioLogeado;
            }
    
            next();
        })
    } else {
        next();
    }

}

module.exports = userLoggedMiddleware;