let db = require('../database/models');

function postMiddleware(req, res, next) {

    if(req.session.usuarioLogeado && req.session.usuarioLogeado.Rol_FK == 3){
        console.log('Sos Super-Admin');
    } else if(req.session.usuarioLogeado && req.session.usuarioLogeado.Rol_FK == 2){
        console.log('Sos Admin');
    } 
    else{
        console.log('No sos Admin');
        return res.redirect('/');
    }

    next();
}

module.exports = postMiddleware;