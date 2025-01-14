/** 
 * en este archivo nos ayuda a validar si los campos existen 
 * de acuerdo ala intruccion que le demos 
 */

const validator = require("validator");


const validate = (params) => {
  
    let resultado = false;

    let name = !validator.isEmpty(params.name) &&
        validator.isLength(params.name, {
            min: 2,
            max: undefined
        }) &&
        validator.isAlpha(params.name, "es-ES");

    let nick = !validator.isEmpty(params.nick) &&
        validator.isLength(params.nick, {
            min: 1,
            max: 60
        });

    let email = !validator.isEmpty(params.email) &&
        validator.isEmail(params.email);

    let password = !validator.isEmpty(params.password);

    if (params.surname) {
        let surname = !validator.isEmpty(params.surname) &&
            validator.isLength(params.surname, {
                min: 2,
                max: undefined
            }) &&
            validator.isAlpha(params.surname, "es-ES");
        if (!surname) {
            throw new Error("No se ha superado la validacion por el apellido incorrecto ");
       
        } else {
            console.log("Validacion superadad en el apellido")
            resultado = true;
        }
    }

    if (!name || !password || !nick || !email) {
        throw new Error("No se ha superado la validacion");

    } else {
        console.log("validacion superada")
        resultado = true;
    }

}

module.exports = validate;