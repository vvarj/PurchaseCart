const express = require('express');
const app = express();
const PORT = 80;
const path = require("path");
const bodyParser = require("body-parser");
var session = require("express-session");

const database = require('./database/connection');
database();

//for session
app.use(
    session({
        secret: "key123",
        resave: false,
        saveUninitialized: false,
        // store: store,
        cookie: { maxAge: 1000 * 60 }
    })
);

//middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//for satitc files
app.use("/static", express.static("static"));

//views
app.set("view engine", 'hbs');
app.set("views", path.join(__dirname, "views"));

//routes
const home = require("./routes/home");
app.use("/", home);

const cart = require("./routes/cart");
app.use("/cart", cart);


//listen port
app.listen(PORT, () => {
    console.log('connected to server....');
})