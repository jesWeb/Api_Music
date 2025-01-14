const express = require("express");
//cargar router
const router = express.Router();
//importar controlador 
const SongController = require("../controllers/song");
const  prueba = require("../controllers/user");
//definir rutas

router.get("/prueba", SongController.prueba);

//exportar 
module.exports = router;