const express = require('express');

const authRouter = express.Router();

router.get('/register', (req, res) => {
    res.render('register');
});