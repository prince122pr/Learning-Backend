const express = require('express');
const { authUser } = require('../middlewares/auth.middleware');

const homeRouter = express.Router();

homeRouter.get('/',authUser ,(req,res)=>{
    res.render('home');
})

module.exports = homeRouter