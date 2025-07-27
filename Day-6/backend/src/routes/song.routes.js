// We create routes in separate folders to keep our project modular, organized, and scalable. As the application grows, putting all routes in one file (like server.js) becomes messy and hard to manage.

const express = require('express');
const multer = require('multer');
const uploadFile = require('../service/storage.service');

const router = express.Router();

const upload = multer({storage:multer.memoryStorage()});

router.post('/songs',upload.single('audio'), async(req, res)=>{
//    console.log(req.body);
//    console.log(req.file);

  const fileData = await uploadFile(req.file);
  console.log(fileData);
  

   res.status(201).json({
    'message': 'Song created successfully!',
    'song': req.body
   })

})

module.exports = router;