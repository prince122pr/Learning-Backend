const express = require('express');
const authRouter = require('./routes/auth.routes')
const cookieParser = require('cookie-parser');
const homeRouter = require('./routes/home.routes');

const app = express();

// Set EJS as the template engine
app.set("view engine", "ejs")

app.use(express.json());

app.use(express.urlencoded({extended:true})) //an Express middleware that lets our server read form data (like from an HTML <form> using POST method).

app.use(express.static("public"))

app.use(cookieParser()); 

app.use('/', homeRouter);
app.use('/auth', authRouter);

module.exports = app;