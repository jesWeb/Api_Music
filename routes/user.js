//dependecias
const express = require("express");
//cargar router
const router = express.Router();
//importar controlador 
const UserController = require("../controllers/user");
//definir rutas

router.get("/prueba", UserController.prueba);

//exportar 
module.exports = router;