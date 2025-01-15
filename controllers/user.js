//importaciones 
const validate = require("../helpers/validate");
const User = require("../models/user");
const jwt = require("../helpers/jwt");
const bcrypt = require("bcrypt")

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
//login
const login = (req, res) => {

    //recoger los parametros
    let params = req.body;
    //comprobar que lleguen 
    if (!params.email || !params.password) {

        return res.status(400).send({
            status: "error",
            message: "falta un campo por llenar  "
        })
    }

    async function busquedaLog() {
        // buscar en bd 
        const busquedaUser = await User.findOne({
            email: params.email
        }).select("+password +role")

        if (!busquedaUser) {
            return res.status(400).send({
                status: "error",
                message: "no existe el usuario "
            })
        }

        //comporbar contrasena
        //este hace una comparacion con el usuario
        const pwd = bcrypt.compareSync(params.password, busquedaUser.password);
        //eliminar el campo de password /limpiar datos 
        let identidadUser = busquedaUser.toObject();
        delete identidadUser.password;
        delete identidadUser.role;

        if (!pwd) {
            return res.status(400).send({
                status: "error",
                message: " Login Incorrecto"
            })
        }

        //conseguir token en jwt (crear un servicio que no permita crear el token)\
        const token = jwt.tokenCreate(busquedaUser);

        //devoler datos de usuario y stoken 


        return res.status(200).send({
            status: "success",
            message: "Mensaje eniado desde login ",
            user: identidadUser,
            token
        })

    }

    busquedaLog();

}
//perfil
const perfil = (req, res) => {
    //reocger el id 
    const id = req.params.id;
    //consulta para sacar lod datos

    async function Perfil() {

        const viewPerfil = await User.findById(id);

        if (!viewPerfil) {

            return res.status(400).send({
                status: "error",
                message: "El usuario no existe",

            })
        }


        return res.status(200).send({
            status: "success",
            id,
            viewPerfil

        })

    }


    Perfil();
}

const update = (req, res) => {

    //datos user
    let UserIdentity = req.user;
    //datos actualizar
    let UserUpdate = req.body;



    //validar datos 

    try {
        validate(UserUpdate);
    } catch (error) {
        return res.status(400).send({
            status: "error",
            message: "validacion no superada "
        })
    }

    async function Actualizar() {


        //comprobar si el usuario existe 
        const usuarioExt = await User.find({
            $or: [{
                    email: UserUpdate.email.toLowerCase()
                },
                {
                    nick: UserUpdate.nick.toLowerCase()
                }
            ]
        });


        if (!usuarioExt) {

            return res.status(500).send({
                status: "error",
                message: "Error en la consulta de usuarios  "
            })

        }

        //ver si no es el mismo usuario 
        let userIset = false;

        usuarioExt.forEach((user) => {
            if (user && user._id != UserIdentity.id) userIset = true;
        });

        //si ya existe devolver respuetsa 
        if (userIset) {
            return res.status(400).send({
                status: "error",
                message: "El usuario con ese email o nick ya existe"
            });
        }
        //cifrar ala contrasena 
        if (UserUpdate.password) {
            let pwd = await bcrypt.hash(UserUpdate.password, 10);
            UserUpdate.password = pwd;
        } else {
            delete UserUpdate.password;
        }

        // buscar usuario  en la db  y actualizar 
        try {

            let userActualizado = await User.findByIdAndUpdate({
                _id: UserIdentity.id
            }, UserUpdate);

            if (!userActualizado) {
                return res.status(400).send({
                    status: "error",
                    message: "Error al actualzar"
                });
            } else {

                return res.status(200).send({
                    status: "success",
                    message: "Usuario actualizado",
                    user: userActualizado
                });
            }


        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "Problemas al actualizar"
            });
        }


        //devolver respuesta 



        return res.status(200).send({
            status: "success",
            message: "Mensaje eniado desde controlelr "
        })
    }
    Actualizar();

}



module.exports = {
    prueba,
    Register,
    login,
    perfil,
    update
}