//dependecias
const express = require("express");
//cargar router
const router = express.Router();
//importar controlador 
const UserController = require("../controllers/user");
//middelware
const check = require("../middlewares/auth");
//definir rutas
router.get("/prueba", check.auth, UserController.prueba);

//usuarios 
router.post("/register", UserController.Register);
router.post("/login", UserController.login);
router.get("/perfil/:id", check.auth,UserController.perfil);


//exportar 
module.exports = router;