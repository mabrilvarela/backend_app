const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://mabrilvarela:coderhouse@cluster0.ddtseea.mongodb.net/Tienda?retryWrites=true&w=majority")
    .then(() => console.log("Conexion exitosa"))
    .catch( () => console.log("Lamentablemente persisten los errores"))