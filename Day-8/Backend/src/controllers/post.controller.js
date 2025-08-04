const postModel = require("../models/post.model");
const generateCaption = require("../services/ai.service");
const uploadFile = require("../services/storage.service");
const {v4: uuidv4} = require('uuid')

async function createPostController(req, res) {
    const file = req.file;

    const base64ImageFile = new Buffer.from(file.buffer).toString('base64');
   
    const caption = await generateCaption(base64ImageFile);

    const result = await uploadFile(file.buffer, uuidv4());

    const post = await postModel.create({
        image: result.url,
        caption: caption,
        user: req.user._id
    })

    res.status(200).json({
        message: 'Post Created Successfully!',
        post 
    });
      
    
}


module.exports = {createPostController}

