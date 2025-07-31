const express = require('express');

const { registerController, loginController, getUserController } = require('../controllers/auth.controller');

require('dotenv').config();

const userRouter = express.Router();

userRouter.post('/register', registerController)
userRouter.post('/login', loginController)
userRouter.get('/user', getUserController)

module.exports = userRouter;