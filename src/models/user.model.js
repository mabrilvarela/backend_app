const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Usuario: String, 
    Contraseña: String,
    rol: {
        type: String, 
        enum: ["admin", "user"], 
        default: "user"
    }
})

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;