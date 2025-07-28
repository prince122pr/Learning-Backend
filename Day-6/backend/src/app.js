const express = require('express');
const cors = require('cors');
const songRoutes = require('./routes/song.routes.js')

const app = express();
app.use(express.json());

app.use(cors());

app.use('/', songRoutes);

module.exports = app