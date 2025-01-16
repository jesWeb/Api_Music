const express = require("express");
const check = require("../middlewares/auth")
//cargar router
const router = express.Router();
//importar controlador 
const ArtisController = require("../controllers/artist");
//definir rutas
router.get("/prueba", ArtisController.prueba);
router.post("/save", check.auth, ArtisController.guardar);
router.get("/one/:id", check.auth, ArtisController.one);
router.get("/list/:page?", check.auth, ArtisController.list);
//exportar 
module.exports = router;