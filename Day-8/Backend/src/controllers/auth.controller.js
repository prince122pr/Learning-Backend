const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

async function registerController (req, res){

    let {username, password} = req.body;

    // if username is already taken
    let existingUser = await userModel.findOne({
        username
    })

    if(existingUser) return res.status(409).json({
        message: "Username is already taken!"
    })

        await userModel.create({
            username, 
            password: await bcrypt.hash(password, 10)
//Let's say if user enter: hello123
// Bcrypt converts that to something like:
// "$2b$10$n9wFQTxA0ue9Y8D2RcF1Ge..."
// (a long, unique, hashed string)
// Now this hashed version is saved in the database.
        })

    res.status(201).json({
        message: "User Registered Successfully!"
    })

}


async function loginController (req, res){
    let {username, password} = req.body;
    
    let user = await userModel.findOne({
        username
    })

    if(!user){
        return res.status(401).json({
            message: "Username not found!"
        })
    }

    // let isValidPassword = password === user.password;

    let isValidPassword = await bcrypt.compare(password, user.password)
// Let's say user again type hello123
// Bcrypt internally:
// Hashes your enteredPassword
// Checks if it matches the hash stored in DB

    if(!isValidPassword) res.status(401).json({
        message: "Invalid Password!"
    })

    let token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET_KEY);

    res.cookie('token', token);

    res.status(201).json({
        message: "Login Successfully!"
    })

}


module.exports = {registerController, loginController}