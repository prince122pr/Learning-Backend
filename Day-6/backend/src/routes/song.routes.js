// We create routes in separate folders to keep our project modular, organized, and scalable. As the application grows, putting all routes in one file (like server.js) becomes messy and hard to manage.

const express = require('express');
const multer = require('multer');
const uploadFile = require('../service/storage.service');
const Song = require('../models/songs.model');

const router = express.Router();

const upload = multer({storage:multer.memoryStorage()});

router.post('/songs', upload.single('audio'), async(req, res)=>{
//    console.log(req.body);
//    console.log(req.file);

  const fileData = await uploadFile(req.file);
  
  const song = await Song.create({
      title: req.body.title, 
      artist: req.body.artist,
      audio: fileData.url,
      mood: req.body.mood 
  })
  

   res.status(201).json({
    'message': 'Song created successfully!',
    'song': song
   })

})

router.get('/songs', async (req, res) => {
    let {mood} = req.query;
    
    let songs = await Song.find({
        mood: mood
    })

    res.status(200).json({
        message: 'Songs fetched successfully!',
        songs
    })
    
})

module.exports = router;