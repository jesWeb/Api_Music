const albums = require("../models/albums");
const Album = require("../models/albums");
const Song = require("../models/song");
const Artist = require("../models/artist");
const fs = require('fs');
const path = require('path');

const prueba = (req, res) => {
    return res.status(200).send({
        status: "success",
        message: "Mensaje eniado desde controlelr "
    })
}
const registro = (req, res) => {
    try {
        //sacar datos enviados e el body 
        let params = req.body;

        //crear objetos 
        let Album = new albums(params);

        //nota anexa un if con los elementos a llegar

        //guardar 
        Album.save();

        return res.status(200).send({
            status: "success",
            message: "Se ha guardado el Album correctamente",
            albun: Album
        })

    } catch (error) {
        return res.status(500).send({
            status: "error",
            error,
            message: "No se ha podido guardar el album correctamente  "
        })
    }


}

const one = (req, res) => {
    const albumId = req.params.id;

    async function unoAlbum() {
        try {
            const mostrar = await Album.findById(albumId).populate("artist");

            if (!mostrar) {
                return res.status(404).send({
                    status: "error",
                    message: "no se encuentra el album",
                    album: mostrar
                });
            } else {
                return res.status(200).send({
                    status: "success",
                    album: mostrar
                });
            }
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "Error al obtener el álbum",
                error: error.message
            });
        }
    }

    unoAlbum();
}

const lista = (req, res) => {

    //sacra el id del artista 
    const artistId = req.params.artistId;

    // scar el todos los albuns del la bbd de un artista 
    if (!artistId) {
        return res.status(404).send({
            status: "error",
            message: "no se ha encontrado el artista"
        })
    }
    async function listados() {
        //popular info del artista
        const albums = await Album.find({
            artist: artistId
        }).populate("artist");

        if (!albums) {
            return res.status(404).send({
                status: "error",
                message: "no se encuentra el album "
            })
        } else {
            return res.status(200).send({
                status: "success",
                albums: albums
            })
        }
    }

    listados();
}

const update = async (req, res) => {

    const albumId = req.params.albumId;
    const data = req.body;

    if (!albumId) {
        return res.status(400).send({
            status: "error",
            message: "El ID del álbum es obligatorio"
        });
    }

    try {
        // Aquí puedes realizar la actualización
        const album = await Album.findByIdAndUpdate(albumId, data, {
            new: true
        });

        if (!album) {
            return res.status(404).send({
                status: "error",
                message: "No se encuentra el álbum con ese ID"
            });
        }

        return res.status(200).send({
            status: "success",
            album
        });
    } catch (err) {
        return res.status(500).send({
            status: "error",
            message: "Hubo un error al actualizar el álbum",
            error: err.message
        });
    }
};



//upload
const upload = (req, res) => {
    async function AlbumUpdated() {
        let albumId = req.params.id;
        //recoger fichero de imagen y comprobar si existe 
        if (!req.file) {
            return res.status(400).send({
                status: "error",
                message: "La peticion no incluye la imagen",

            })
        }
        //conseguir el nombre del archivo 
        let image = req.file.originalname;

        //sacar info de la imagen 
        const imagenSplit = image.split("\.");
        const extension = imagenSplit[1];

        //comprobar si la extension es valida 
        if (extension !== 'png' && extension !== 'jpg' && extension !== 'jpeg') {
            //si no es es6te eliminara el archivo  subido 
            const filePath = req.file.path;
            //file system 
            const fileDelete = fs.unlinkSync(filePath);
            return res.status(400).send({
                status: "error",
                message: "Extension del fiechero es invalida",
                fileDelete
            })
        }
        try {
            let albumUpdated = await Album.findOneAndUpdate({
                _id: albumId
            }, {
                image: req.file.filename
            }, {
                new: true
            });
            //devolver respuesta 
            return res.status(200).send({
                status: "success",
                arista: albumUpdated,
                file: req.file
            })
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "error en la subida del archivo ",
            })
        }
    }
    AlbumUpdated();
}

//mostrar image 

const mostrarImageA = async (req, res) => {
    // sacar el parametro de la url 
    const file = await req.params.file;
    //montar el path de la imagen 
    const filePath = "./images/albums/" + file;
    //comprobar si existe 
    fs.stat(filePath, (exists) => {

        if (!exists) {
            //devolver u file 
            return res.sendFile(path.resolve(filePath));

        } else {
            return res.status(404).send({
                status: "error",
                menssage: "no existe la imagen "
            });
        }


    });
}
const eliminar = async (req, res) => {
    const albumId = req.params.id;

    try {
        // Eliminar el álbum
        const albumRemove = await Album.deleteOne({ _id: albumId });

        if (albumRemove.deletedCount === 0) {
            return res.status(404).send({
                status: "error",
                message: "Álbum no encontrado"
            });
        }

        // Eliminar las canciones asociadas al álbum
        const songRemove = await Song.deleteMany({ album: albumId });

        return res.status(200).send({
            status: "success",
            message: "Álbum y canciones eliminados",
            albumRemove,
            songRemove
        });
    } catch (error) {
        console.error(error); // Es recomendable loguear el error para depuración
        return res.status(500).send({
            status: "error",
            message: "Error al eliminar el álbum o alguno de sus elementos",
            error: error.message || error
        });
    }
};




module.exports = {
    prueba,
    registro,
    one,
    lista,
    update,
    upload,
    mostrarImageA,
    eliminar
}