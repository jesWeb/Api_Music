//dependecias
const express = require("express");
//cargar router
const router = express.Router();
//importar controlador 
const UserController = require("../controllers/user");
//definir rutas
router.get("/prueba", UserController.prueba);

//usuarios 
router.post("/register", UserController.Register);
router.post("/login", UserController.login);
router.get("/perfil/:id", UserController.perfil);


//exportar 
module.exports = router;