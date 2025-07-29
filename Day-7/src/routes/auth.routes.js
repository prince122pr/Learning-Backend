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

  }, process.env.JWT_SECRET)

  res.status(201).json({
    message: "Welcome Back!",
    token, // ✅ Don't forget to send the token to the client
  });
});

export default authRouter;
