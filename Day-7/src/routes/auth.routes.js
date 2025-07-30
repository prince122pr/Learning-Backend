import express from "express";
import jwt from 'jsonwebtoken'
import { userModel } from "../models/user.model.js";

import dotenv from 'dotenv';

dotenv.config();

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  let { username, password } = req.body;

  //optional
//   let existingUser = await userModel.findOne({ username });
//   if (existingUser) {
//     return res.status(409).json({ message: "Username already taken!" });
//   }

  let user = await userModel.create({
    username,
    password,
  });

  res.status(201).json({
    message: "User Registered Successfully!",
    user,
  });
});


authRouter.post("/login", async (req, res) => {
  let { username, password } = req.body;

  let user = await userModel.findOne({
    username: username,
  });

  if (!user) {
    return res.status(401).json({
      message: "User not found!",
    });
  }

  let isPasswordValid = password === user.password;

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid Password!",
    });
  }


//   token part
  let token = jwt.sign({
    id:user._id,
    
  }, process.env.JWT_SECRET,   { expiresIn: "7d" }//optional but recommended 
  )

  res.cookie("token", token);

  res.status(201).json({
    message: "Welcome Back!",
  });
});


authRouter.get("/user", async(req, res)=>{

    let {token} = req.cookies;

    // when no token there
    if(!token){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    // if we get token, then need to verify token
    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findOne({
            _id: decoded.id
        })

        res.status(200).json({
            message: 'User data fetched successfully!',
            user
        })

    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized | Invalid Token"
        })
    }

})


authRouter.get('/logout', (req, res)=>{
  res.clearCookie('token');
  res.status(200).json({
    message: "User logged out successfully!"
  })
})

export default authRouter;
