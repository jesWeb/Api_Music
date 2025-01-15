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

//configuracion de subida de archivo
const multer = require("multer");
//donde almacenar 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images/avatars");
    },
    filename: (req, file, cb) => {
        cb(null, "avatar-" + Date.now() + "-" + file.originalname);
    }
})
//tipo middleware
const uploads = multer({
    storage
});

//usuarios 
router.post("/register", UserController.Register);
router.post("/login", UserController.login);
router.get("/perfil/:id", check.auth, UserController.perfil);
router.put("/update", check.auth, UserController.update);
router.post("/upload", [check.auth, uploads.single("file0")], UserController.upload);


//exportar 
module.exports = router;