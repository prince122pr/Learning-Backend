const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const { createPostController } = require('../controllers/post.controller');

const postRouter = express.Router();

// protected routes using middleware
postRouter.post('/', authMiddleware, createPostController);

module.exports = postRouter;
