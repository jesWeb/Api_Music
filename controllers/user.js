//importaciones 
const validate = require("../helpers/validate");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const prueba = (req, res) => {
    return res.status(200).send({
        status: "success",
        message: "Mensaje eniado desde controlelr "
    })
}

//registro
const Register = (req, res) => {


    //recoger datos
    let params = req.body;
    //comprobar datos que llegen bien

    if (!params.name || !params.nick || !params.surname || !params.email || !params.password) {
        return res.status(400).send({
            status: "error",
            message: "faltan por enviar datos"

        })
    }

    //validar datos 

    try {
        validate(params);
    } catch (error) {
        return res.status(400).send({
            status: "error",
            message: "validacion no superada "
        })
    }

    //control de usuarios duplicados 

    async function duplicados() {

        try {
            if (!params.email || !params.nick) {
                return res.status(400).send({
                    message: "Faltan parámetros",
                    status: "warning"
                });
            }

            const duplicado = await User.find({
                $or: [{
                        email: params.email.toLowerCase()
                    },
                    {
                        nick: params.nick.toLowerCase()
                    },
                ]
            });

            if (duplicado && duplicado.length >= 1) {
                return res.status(400).send({
                    message: "El usuario ya existe",
                    status: "warning"
                });
            }
            //cifrar contrasena 

            let pwd = await bcrypt.hash(params.password, 10);
            params.password = pwd;

            //crear onjeto de usuario 
            let userToSave = new User(params);
            //guardar usuario en la base de datos 
            const userSave = await userToSave.save();

            if (!userSave) {
                return res.status(500).send({
                    status: "error",
                    message: "Error en el registro"
                })
            }

            //limpiar el objeto quitar password y role 
            let userCreated = userSave.toObject();
            delete userCreated.password; 
            delete userCreated.role; 



            //respuetsa 
            return res.status(200).send({
                status: "success",
                message: "Usuario registrado",
                user: userSave
            });


        } catch (error) {
            console.error("Error al verificar duplicados:", error);
            return res.status(500).send({
                message: "Error en la consulta de usuarios duplicados",
                status: "Error"
            })
        }
    }

    duplicados();








}








module.exports = {
    prueba,
    Register
} 