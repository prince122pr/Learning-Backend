const mongoose = require('mongoose');

const connectToDB = async() => {
    mongoose.connect('mongodb+srv://prince7869:7zUceg597Ru0Pa0R@cluster0.szvn4ni.mongodb.net/Backend').then(()=>{
        console.log('DB is connected successfully!');  
    }).catch((e)=>{
      console.log('Error: ', e);
    })
}

module.exports = connectToDB;