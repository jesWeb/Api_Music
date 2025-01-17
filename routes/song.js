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
        cb(null, "./audios/");
    },
    filename: (req, file, cb) => {
        cb(null, "cancion-" + Date.now() + "-" + file.originalname);
    }
})
//tipo middleware
const uploads = multer({
    storage
});



const prueba = require("../controllers/user");
//definir rutas

router.get("/prueba", SongController.prueba);
router.post("/save", check.auth, SongController.save);
router.get("/one/:id", check.auth, SongController.one);
router.get("/lista/:albumId", check.auth, SongController.lista);
router.put("/editar/:id", check.auth, SongController.editar);
router.delete("/eliminar/:id", check.auth, SongController.eliminar);
router.post("/upload/:id", [check.auth, uploads.single("file")], SongController.upload);
router.get("/audio/:file", check.auth,SongController.audio);

//exportar 
module.exports = router;