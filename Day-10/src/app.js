const express = require('express');
const indexRouter = require('./routes/index.routes');

const app = express();

// Set EJS as the template engine
app.set("view engine", "ejs")

app.use(express.json());

app.use(express.urlencoded({extended:true})) //an Express middleware that lets our server read form data (like from an HTML <form> using POST method).

app.use(express.static("public"))

app.use('/', indexRouter);

module.exports = app;