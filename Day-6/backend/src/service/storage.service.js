
var ImageKit = require("imagekit");
const mongoose = require('mongoose')
require('dotenv').config(); 

var imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
});

function uploadFile(file){
    return new Promise( (resolve, reject) => {
        imagekit.upload({
            file: file.buffer,
            // fileName: Math.random().toString().substring(10),
            fileName: new mongoose.Types.ObjectId().toString().substring(7),
            folder: 'facial-expression-project-songs'
        },(error, result) => {
            if(error) reject(error);
            else resolve(result)
        })
    })
}

module.exports = uploadFile;