const express = require("express");
const router = express.Router();
const UserModel = require("../models/user.model.js");
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    const {usuario, contraseña} = req.body; 
    try { 
        const existeUsuario = await UsuarioModel.findOne({usuario});

        if(existeUsuario) {
            return res.status(400).send("El usuario ya existe");
        }
 
        const newUser = new UserModel({
            usuario,
            contraseña,
        });

        await newUser.save();

        const token = jwt.sign({usuario}, "coderhouse", {expiresIn:"1h"});
 
        res.cookie("coderCookieToken", token, {
            maxAge: 3600000, 
            httpOnly: true 
        });

        res.redirect("/home");

    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }
})


router.post("/login", async (req, res) => {
    const {usuario, contraseña} = req.body; 
    try {
        const foundUser = await UserModel.findOne({usuario});

        if(!foundUser) {
            return res.status(401).send("Usuario no valido");
        }
 
        if(contraseña !== usuarioEncontrado.contraseña) {
            return res.status(401).send("Contraseña incorrecta");
        }
 
        const token = jwt.sign({usuario: foundUser.usuario, rol:foundUser.rol}, "coderhouse", {expiresIn:"1h"});
 
        res.cookie("coderCookieToken", token, {
            maxAge: 3600000, 
            httpOnly: true 
        });

        res.redirect("/home");

    } catch (error) {
        res.status(500).send("Error interno del servidor"); 
    }
})


router.get("/home", passport.authenticate("jwt", {session:false}), (req, res) => {
    res.render("home", {usuario: req.user.usuario});
})



router.post("/logout", (req, res) => {
    res.clearCookie("coderCookieToken");
    res.redirect("/login"); 
})


router.get("/admin", passport.authenticate("jwt", {session:false}), (req, res) => {
    if(req.user.rol !== "admin") {
        return res.status(403).send("Acceso denegado");
    }

    res.render("admin");
})

module.exports = router; 