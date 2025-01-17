const Song = require('../models/song');
const album = require('../models/albums');
const Artist =  require("../models/artist");


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

        }).sort("track").populate({path:"albums",populate:{
            path:"artist",
            model:"Artist"
        }});

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



//upload
// const upload = (req, res) => {



//     async function ArtistUpdated() {
//         let artistId = req.params.id;
//         //recoger fichero de imagen y comprobar si existe 
//         if (!req.file) {
//             return res.status(400).send({
//                 status: "error",
//                 message: "La peticion no incluye la imagen",

//             })
//         }
//         //conseguir el nombre del archivo 
//         let image = req.file.originalname;

//         //sacar info de la imagen 
//         const imagenSplit = image.split("\.");
//         const extension = imagenSplit[1];

//         //comprobar si la extension es valida 
//         if (extension !== 'png' && extension !== 'jpg' && extension !== 'jpeg') {

//             //si no es es6te eliminara el archivo  subido 
//             const filePath = req.file.path;
//             //file system 
//             const fileDelete = fs.unlinkSync(filePath);

//             return res.status(400).send({
//                 status: "error",
//                 message: "Extension del fiechero es invalida"
//             })

//         }

//         try {


//             let artistUpdated = await Artist.findOneAndUpdate({
//                 _id: artistId
//             }, {
//                 image: req.file.filename
//             }, {
//                 new: true
//             });

//             //devolver respuesta 
//             return res.status(200).send({
//                 status: "success",
//                 arista: artistUpdated,
//                 file: req.file
//             })


//         } catch (error) {
//             return res.status(500).send({
//                 status: "error",
//                 message: "error en la subida del archivo ",
//             })
//         }


//     }

//     ArtistUpdated();


// }

// //mostrar image 

// const mostrarImageA = async (req, res) => {
//     // sacar el parametro de la url 
//     const file = await req.params.file;
//     //montar el path de la imagen 
//     const filePath = "./images/artistas/" + file;
//     //comprobar si existe 
//     fs.stat(filePath, (exists) => {

//         if (!exists) {
//             //devolver u file 
//             return res.sendFile(path.resolve(filePath));

//         } else {
//             return res.status(404).send({
//                 status: "error",
//                 menssage: "no existe la imagen "
//             });
//         }


//     });
// }





module.exports = {
    prueba,
    save,
    one,
    lista
    // mostrarImageA,
    // upload
}