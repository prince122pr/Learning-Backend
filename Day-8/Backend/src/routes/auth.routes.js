const express = require('express');

const { registerController, loginController } = require('../controllers/auth.controller');

require('dotenv').config();

const userRouter = express.Router();

userRouter.post('/register', registerController)
userRouter.post('/login', loginController)

module.exports = userRouter;