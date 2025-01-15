//dependencias
const jwt = require("jwt-simple");
const moment = require("moment");

//clave secreta 
const secret = "La_ciave_Punchy_Music-4568";
//crear funcion para tokens 
const tokenCreate = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        role: user.role,
        Image: user.Image,
        iat: moment().unix(),
        exp: moment().add(30, "days").unix()
    }
    //devolver token 
    return jwt.encode(payload, secret)
}

//exportar 
module.exports = {
    secret,
    tokenCreate 
}