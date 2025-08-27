const express = require('express');
const { getRegisterController, postRegisterController, getLoginController, postLoginController, userLogout } = require('../controllers/auth.controller');

const authRouter = express.Router();

// authRouter.get('/register', getRegisterController);
// authRouter.post('/register', postRegisterController);
authRouter.route('/register')
    .get(getRegisterController)
    .post(postRegisterController);

authRouter.route('/login')
    .get(getLoginController)
    .post(postLoginController);

authRouter.route('/logout').get(userLogout)
    

module.exports = authRouter;    