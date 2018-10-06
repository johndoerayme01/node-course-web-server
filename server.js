const express = require("express");
const app = express();
const pug = require("pug");
const fs = require("fs");

const port = process.env.PORT || 3000;

app.set("view engine", "pug");

app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
    var now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    
    fs.appendFile("server.log", log + "\n", (err) => {
        if (err) {
            console.log("Unable to append to server.log");
        }
    });

    next();
});

// app.use((req, res, next) => {
//     res.render("maintenance.pug");
// });

app.get("/", (req, res) => {
    res.render("home.pug", {
        pageTitle: "Home Page",
        welcomeMessage: "The quick red fox jumps over the lazy dog",
        currentYear: new Date().getFullYear()
    });
});

app.get("/about", (req, res) => {
    res.render("about.pug", {
        pageTitle: "About Page",
        welcomeMessage: "The quick orange fox jumps over the lazy dog.",
        currentYear: new Date().getFullYear(),
    });
});

app.get("/bad", (req, res) => {
    res.json({
        error: "Unable to handle request"
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});