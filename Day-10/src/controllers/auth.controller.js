const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getRegisterController = (req, res) => {
    res.render("register")
}

const postRegisterController = async(req, res) => {
    const { username, email, password } = req.body;

    const isUserExist = await userModel.findOne({
        $or: [{ email }, { username }]  // Check if email or username already exists
    })

    if (isUserExist) {
        return res.status(400).json( {
            message: "User already exists with this email or username"
        });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

     await userModel.create({
        username,
        email,
        password: hashedPassword
    });


    // res.status(201).json({
    //     message: "User registered successfully!",
    // })

       return res.redirect('/auth/login');

}


const getLoginController = (req, res) => {
    res.render("login")
}

const postLoginController = async(req, res) => {
    const { userData, password } = req.body;
    
    const user = await userModel.findOne({
        $or: [{ email: userData }, { username: userData }]  // Check if email or username matches
    })

    if(!user) {
        return res.redirect("/auth/login", {
            message: "User not found with this email or username"
        });
    }

    let isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword) {
       return res.redirect('/auth/login?error=Invalid password')
    }

    let token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {
       expiresIn: "7d" }) 

    res.cookie("token", token);

    // res.status(200).json({
    //     message: "Logged in successfully",
    //     user})
    res.redirect('/')

}


const userLogout = async(req, res) => {
   res.clearCookie('token');
   return res.redirect('/auth/login')
}

module.exports = {getRegisterController, postRegisterController, getLoginController, postLoginController, userLogout}