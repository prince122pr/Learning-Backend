const express = require('express');
const userRouter = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');
const postRouter = require('./routes/post.routes');

const app = express();

require('dotenv').config();

app.use(express.json());
app.use(cookieParser())

app.use('/api/auth', userRouter);
app.use('/api/posts', postRouter)

module.exports = app;