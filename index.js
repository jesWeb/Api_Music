//importar conexion db
const conection = require('./database/conectionDatabase');
//importar dependecias 
const cors = require("cors");
const express = require("express");
//mensaje de vconexion
console.log("API Rest con node para la app de musica ")

//ejectuar conexion de bd 
conection();

// crear servidor
const app = express();
const port = 3910;
//configurar cors
app.use(cors());
//convertir data de body en json 
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//rutas 
const UserRoutes = require("./routes/user");
const ArtistRouter = require("./routes/artist");
const AlbumRouter = require("./routes/album");
const SongRouter = require("./routes/song");

//prefigo de apis 
app.use("/api/user", UserRoutes);
app.use("/api/artista", ArtistRouter);
app.use("/api/albunes", AlbumRouter);
app.use("/api/canciones", SongRouter);


//ruta peuba 
app.get('/prueba', (req, res) => {
    return res.status(200).send({
        "id": 25,
        "nombre": "jesus",
        "edad": 25
    })
});
//poner serv a escuahar peticiones http 
app.listen(port, () => {
    console.log("Servidor de node esta escuchasndo en el puerto ", port);
})