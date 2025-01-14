//dependencia 
const jwt = require("jwt-simple");
const moment = require("moment");
//clave secreta 
const {
    secret
} = require("../helpers/jwt");
//crear middelware
exports.auth = (req, res, next) => {

    //comprobar si llega la cabecera de auth 
    if (!req.headers.authorization) {
        return res.status(403).send({
            status: "error",
            menssage: "La peticion no tiene la cabecerea de utentificacion"
        })
    }

    //limpiar token 
    let token = req.headers.authorization.replace(/['"]+/g, " ");

    try {
        //decodificar el token 
        let payload = jwt.decode(token, secret);
        //comprobar la expiracion del token 
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({
                status: "error",
                menssage: "Token expirado",
                error
            })
        }
        // agregar datos del usuario al request 
        req.user = payload;

    } catch (error) {
        return res.status(404).send({
            status: "error",
            menssage: "La peticion no tiene la cabecerea de utentificacion",
            error
        })
    }

    //pasar la ejecucion de la accion
    next();
}