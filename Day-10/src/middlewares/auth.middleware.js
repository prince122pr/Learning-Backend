const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

const authUser = async(req, res, next) => {
   let {token} = req.cookies;

    if (!token) {
        return res.redirect("/auth/login")
    }

    try {
        let decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

        let user = await userModel.findById(decoded.id);
        req.user = user;
        next();

    } catch (error) {
        console.log(error);
        
       return res.redirect("/auth/login")
    }

}

module.exports = {authUser}