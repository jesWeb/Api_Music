//importar mongose
const mongoose = require("mongoose");
//solucion a error 
mongoose.set("strictQuery", true);

const conection = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/SoundDb")
        console.log("Conectado correctamente a bd : soundDB");
    } catch (error) {
        console.log(error)
        throw new Error("no se ha conectado a la base de datos ");

    }
}

module.exports = conection;