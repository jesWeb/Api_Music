const Artist = require("../models/artist");
const paginate = require('mongoose-pagination');
const fs = require('fs');
const path = require("path");

const prueba = (req, res) => {
    return status(200).send({
        status: "success",
        message: "Mensaje eniado desde controlelr "
    })
}


const guardar = async (req, res) => {

    try {

        //datos del body 
        let params = req.body;
        //crear el objeto a guardar
        let artist = new Artist(params);
        //guardarlo 
        const artistStored = await artist.save();

        if (!artistStored) {

            return res.status(400).send({
                status: "error",
                message: "No se ha guardado el artista ",
            })
        } else {

            return res.status(200).send({
                status: "success",
                message: "Artista guardado ",
                artist: artistStored
            })
        }

    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error al guardar el artista",
            error: error.message,
        });
    }

}

//sacar un artista 
const one = (req, res) => {

    //sacar parametro por ulr 
    const artistId = req.params.id;
    //obtener con find 
    async function obtener() {

        const obtenerArt = await Artist.findById(artistId);

        if (!obtenerArt) {
            return res.status(400).send({
                status: "error",
                message: "el artista no existe "
            })
        } else {

            return res.status(200).send({
                status: "success",
                artista: obtenerArt
            })
        }

    }

    obtener();
}

//listado de artistas 
const list = (req, res) => {

    //sacar la posible pagina
    let page = 1;

    if (req.params.page) {
        page = req.params.page;
    }

    //nota ver como desactivar cuando no hay 
    async function paginado() {

        //definir numero de elemento por page 

        const itemsporPage = 5;

        //find , ordenarlo y paginarlo
        const paginationOrder = await Artist.find().sort("name").paginate(
            page, itemsporPage
        );

        if (!paginationOrder) {
            return res.status(404).send({
                status: "error",
                message: "no hay artistas "
            })
        } else {
            return res.status(200).send({
                status: "success",
                page,
                itemsporPage,
                paginationOrder
            })
        }
    }

    paginado();

}


const editar = (req, res) => {

    //id artista url 
    const id = req.params.id;
    //recoger datos del body 
    const data = req.body;

    async function edicion() {
        try {

            let editarArt = await Artist.findByIdAndUpdate(id, data, {
                new: true
            });


            if (!editarArt) {

                return res.status(404).send({
                    status: "error",
                    message: "el artista no se encontro y no se actualizo "
                })
            } else {
                return res.status(200).send({
                    status: "success",
                    message: "Artista actualizado",
                    artista: editarArt
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

    //sacar el id de la url 
    const artistId = req.params.id;
    //consultar para buscar y eliminar con el wait 
    async function eliminar(params) {
        try {
            //eliminar artista
            const artisRemove = await Artist.findByIdAndDelete(artistId)
            //alimiar album
            //eliminar songs


            return res.status(200).send({
                status: "success",
                message: "metodo borrado artista ",
                artisRemove
            })
        } catch (error) {

            return res.status(500).send({
                status: "error",
                message: "Error al eliminar elartista o alguno de sus elelementos ",
                error
            })
        }
    }
    eliminar();

}

//upload
const upload = (req, res) => {



    async function ArtistUpdated() {
        let artistId = req.params.id;
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
                message: "Extension del fiechero es invalida"
            })

        }

        try {


            let artistUpdated = await Artist.findOneAndUpdate({
                _id: artistId
            }, {
                image: req.file.filename
            }, {
                new: true
            });

            //devolver respuesta 
            return res.status(200).send({
                status: "success",
                arista: artistUpdated,
                file: req.file
            })


        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "error en la subida del archivo ",
            })
        }


    }

    ArtistUpdated();


}

//mostrar image 

const mostrarImageA = async (req, res) => {
    // sacar el parametro de la url 
    const file = await req.params.file;
    //montar el path de la imagen 
    const filePath = "./images/artistas/" + file;
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



module.exports = {
    prueba,
    guardar,
    one,
    list,
    editar,
    eliminar,
    mostrarImageA,
    upload
}