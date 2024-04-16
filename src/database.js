const mongoose = require("mongoose");
const configObject = require("./config/config.js");
const {mongo_url} = configObject;


class dataBase {
    static #instancia;

    constructor() {
        mongoose.connect(mongo_url);
    }

    static getInstancia(){
        if(this.#instancia) {
            console.log("Conexión previa");
            return this.#instancia;
        }

        this.#instancia = new dataBase();
        console.log("Conexión exitosa");
        return this.#instancia;
    }
}

module.exports = dataBase.getInstancia();