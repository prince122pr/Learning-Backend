// A controller is a function (or a group of functions) that handles the logic for processing incoming HTTP requests, interacting with the database or other services, and sending the appropriate response back to the client.
//A controller is basically just a function that contains the logic for what a route should do.

const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

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
        username, password
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

    let isValidPassword = password === user.password;

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


async function getUserController(req, res){
    let {token} = req.cookies;

    if(!token) return res.status(401).json({
        message: 'Unauthorized!'
    })
    
    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        let user = await userModel.findOne({
            _id: decoded.id
        })

        res.status(200).json({
            message: 'User Fetched Successfully!',
            user
        })

    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized | Invalid Token"
        })
    }

}

module.exports = {registerController, loginController, getUserController}