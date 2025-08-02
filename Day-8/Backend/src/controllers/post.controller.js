const generateCaption = require("../services/ai.service");


async function createPostController(req, res) {
    const file = req.file;
    // console.log(file);

    const base64ImageFile = new Buffer.from(file.buffer).toString('base64');
    
    const caption = await generateCaption(base64ImageFile);
    res.status(200).json({
        message: 'Caption Generated Successfully!',
        caption
    });
      
    
}


module.exports = {createPostController}

