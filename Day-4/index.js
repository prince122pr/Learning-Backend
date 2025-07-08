const express = require('express');

let app = express();
app.use(express.json()); //It allows your Express app to read JSON data sent in the request body — especially in POST, PUT, or PATCH requests.

let notes = [];

app.post('/notes', (req, res)=>{
    notes.push(req.body);
    res.json({
       message: 'Note created successfully!',
       success: true
    })
})

app.get('/notes', (req, res)=>{
    res.json(notes);
})

app.patch('/notes/:id', (req, res)=>{
    let id = req.params.id;
    notes[id].title = req.body.title
    res.json({
       message: 'Note updated successfully!',
       success: true
    })
})

app.delete('/notes/:id', (req, res)=>{
    let id = req.params.id;
    delete(notes[id]);
    res.json({
       message: 'Note deleted successfully!',
       success: true
    })
})

app.listen(3000, ()=>{
    console.log('App is running on the port 3000');
})