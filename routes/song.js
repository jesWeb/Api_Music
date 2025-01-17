const express = require("express");
//cargar router
const router = express.Router();
//importar controlador 
const SongController = require("../controllers/song");
//middelwate 
const check = require("../middlewares/auth");
//configuracion de subida de archivo
const multer = require("multer");
//donde almacenar 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images/artistas/");
    },
    filename: (req, file, cb) => {
        cb(null, "artista-" + Date.now() + "-" + file.originalname);
    }
})
//tipo middleware
const uploads = multer({
    storage
});



const  prueba = require("../controllers/user");
//definir rutas

router.get("/prueba", SongController.prueba);
router.post("/save",check.auth, SongController.save);
router.get("/one/:id", check.auth, SongController.one);
router.get("/lista/:albumId", check.auth, SongController.lista);
// router.post("/upload/:id", [check.auth, uploads.single("file0")], ArtisController.upload);
// router.get("/image/:file", check.auth, ArtisController.mostrarImageA);

//exportar 
module.exports = router;