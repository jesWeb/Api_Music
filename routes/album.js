const express = require("express");
//cargar router
const router = express.Router();
//importar controlador 
const AlbumController = require("../controllers/album");
//definir rutas

router.get("/prueba", AlbumController.prueba);

//exportar 
module.exports = router;