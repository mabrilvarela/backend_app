const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store");
const fileStore = FileStore(session);
const app = express();
const exphbs = require("express-handlebars");
const PUERTO = 8080;
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const userRouter = require("./routes/user.router.js");
const sessionRouter = require("./routes/sessions.router.js");
const initializePassport = require("./config/passport.config.js");
const passport = require("passport");
require("../src/database.js");

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use(express.static("./src/public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/sessions", sessionRouter);
app.use("/", viewsRouter);


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