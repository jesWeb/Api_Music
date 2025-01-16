const express = require("express");
const check = require("../middlewares/auth")
//cargar router
const router = express.Router();
//importar controlador 
const ArtisController = require("../controllers/artist");
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

//definir rutas
router.get("/prueba", ArtisController.prueba);
router.post("/save", check.auth, ArtisController.guardar);
router.get("/one/:id", check.auth, ArtisController.one);
router.get("/list/:page?", check.auth, ArtisController.list);
router.put("/editar/:id", check.auth, ArtisController.editar);
router.delete("/eliminar/:id", check.auth, ArtisController.eliminar);
router.post("/upload/:id", [check.auth, uploads.single("file0")], ArtisController.upload);
router.get("/image/:file", check.auth, ArtisController.mostrarImageA);
//exportar 
module.exports = router;