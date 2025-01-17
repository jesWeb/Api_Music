const Song = require('../models/song');
const album = require('../models/albums');
const Artist = require("../models/artist");


const prueba = (req, res) => {
    return status(200).send({
        status: "success",
        message: "Mensaje eniado desde controlelr "
    })
}


const save = (req, res) => {

    try {
        //parametros de datos que llegan 
        let params = req.body;
        // crear un objeto 
        let cancion = new Song(params);
        //guardado
        cancion.save();

        return res.status(200).send({
            status: "success",
            message: "se ha guardado la cancion cone exito",
            nombre: cancion
        })
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "No se ha podido guardar la cancion  "
        })
    }
}

//mostrar uno
const one = (req, res) => {

    //recoger el id 
    const songId = req.params.id;

    async function unaCancion() {
        try {
            const mostrar = await Song.findById(songId).populate("albums");
            if (!mostrar) {
                return res.status(404).send({
                    status: "error",
                    message: "No se encuentra la cancion",
                    cancion: mostrar
                });
            } else {
                return res.status(200).send({
                    status: "success",
                    song: mostrar
                });
            }
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "Error al obtener la cancion",
            });
        }

    }
    unaCancion();
}

const lista = (req, res) => {
    //sacar el id 
    const albumId = req.params.albumId;
    //listar todas las canciones en la bd '
    if (!albumId) {
        return res.status(404).send({
            status: "error",
            message: "no se ha encontrado las caciones "
        })
    }

    async function listas() {
        const canciones = await Song.find({
            album: albumId,

        }).sort("track").populate({
            path: "albums",
            populate: {
                path: "artist",
                model: "Artist"
            }
        });

        if (!canciones) {
            return res.statu(404).send({
                status: "error",
                mensagge: "no se encuentran las caciones"
            });
        } else {
            return res.status(200).send({
                status: "success",
                songs: canciones
            })
        }
    }
    listas();
}

const editar = (req, res) => {

    //id de cancion url 
    const songId = req.params.id;
    //recoger datos del body 
    const data = req.body;

    async function edicion() {
        try {

            let editarCancion = await Song.findByIdAndUpdate(songId, data, {
                new: true
            });


            if (!editarCancion) {

                return res.status(404).send({
                    status: "error",
                    message: "el cancion no se encontro y no se actualizo "
                })
            } else {
                return res.status(200).send({
                    status: "success",
                    message: "Cancion actualizada",
                    cancion: editarCancion
                })
            }

        } catch (error) {

            return res.status(500).send({
                status: "error",
                message: "no se puedo actualizar "
            })
        }
    }

    edicion();
}

const eliminar = (req, res) => {
    const songId = req.params.id;

    async function borrad() {
        try {
            let songRemove = await Song.findByIdAndDelete(songId);

            if (!songRemove) {
                return res.status(404).send({
                    status: "error",
                    message: "Canción no encontrada o ya eliminada",
                });
            }

            return res.status(200).send({
                status: "success",
                message: "Se ha eliminado la canción",
                song: songRemove,
            });
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "Error al eliminar la canción",
                error: error.message,
            });
        }
    }

    borrad();
}



module.exports = {
    prueba,
    save,
    one,
    lista,
    editar,
    eliminar
    // mostrarImageA,
    // upload
}