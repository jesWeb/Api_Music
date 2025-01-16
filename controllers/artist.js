const Artist = require("../models/artist");
const paginate = require('mongoose-pagination');

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


// const prueba = (req, res) => {
//     return status(200).send({
//         status: "success",
//         message: "Mensaje eniado desde controlelr "
//     })
// }


// const prueba = (req, res) => {
//     return status(200).send({
//         status: "success",
//         message: "Mensaje eniado desde controlelr "
//     })
// }




module.exports = {
    prueba,
    guardar,
    one,
    list
}