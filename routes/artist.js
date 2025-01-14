const express = require("express");
//cargar router
const router = express.Router();
//importar controlador 
const ArtisController = require("../controllers/artist");
//definir rutas
router.get("/prueba", ArtisController.prueba);

//exportar 
module.exports = router;