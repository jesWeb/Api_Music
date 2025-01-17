const express = require("express");
//cargar router
const router = express.Router();
//middlware
const check = require("../middlewares/auth");
//importar controlador 
const AlbumController = require("../controllers/album");
//definir rutas
//configuracion de subida de archivo
const multer = require("multer");
//donde almacenar 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images/albums/");
    },
    filename: (req, file, cb) => {
        cb(null, "album-" + Date.now() + "-" + file.originalname);
    }
})
//tipo middleware
const uploads = multer({
    storage
});


router.get("/prueba", AlbumController.prueba);
router.post("/save", check.auth, AlbumController.registro);
router.get("/one/:id", check.auth, AlbumController.one);
router.get("/lista/:artistId", check.auth, AlbumController.lista);
router.put("/update/:albumId", check.auth, AlbumController.update);
router.post("/upload/:id", [check.auth, uploads.single("file0")], AlbumController.upload);
router.get("/image/:file", check.auth, AlbumController.mostrarImageA);


//exportar 
module.exports = router;