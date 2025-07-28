const mongoose = require('mongoose');

const songSchema = mongoose.Schema({
    'title': String,
    'artist': String,
    'mood': String,
    'audio': String, 
})

const Song = mongoose.model('Song', songSchema);

module.exports = Song;