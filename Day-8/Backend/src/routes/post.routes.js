const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const multer = require('multer');
const { createPostController } = require('../controllers/post.controller');

const postRouter = express.Router();

const upload = multer({storage: multer.memoryStorage()})

// protected routes using middleware
postRouter.post(
  '/', 
  authMiddleware,                // First check if the user is logged in (JWT)
  upload.single("image"),        // Then handle image upload (parse form data)
  createPostController           // Then finally process the post creation
);


module.exports = postRouter;
