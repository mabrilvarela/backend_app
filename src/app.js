const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store");
const fileStore = FileStore(session);
const app = express();
const PUERTO = 8080;
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const userRouter = require("./routes/user.router.js");
const sessionRouter = require("./routes/sessions.router.js");
require("../src/database.js");


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({

    secret: "secretcoder", 
    resave: true,  
    saveUninitialized: true, 
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://mabrilvarela:coderhouse@cluster0.ddtseea.mongodb.net/Ecommerce?retryWrites=true&w=majority", ttl: 100
    })

}))

app.use("/api/users", userRouter);
app.use("/api/sessions", sessionRouter);


app.get("/login", (req, res) => {
    let user = req.query.user; 

    req.session.user = user; 
    res.send("Guardamos el usuario");
})


app.get("/user", (req, res) => {
    if(req.session.user) {
        return res.send(`El usuario registrado es: 
        ${req.session.user}`);
    } 

    res.send("No tenemos un usuario registrado");

})

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
})