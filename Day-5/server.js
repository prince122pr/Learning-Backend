const express = require('express');
const connectToDB = require('./src/db/db');
const noteModel = require('./src/models/note.model');

let app = express();

app.use(express.json());

connectToDB();

app.post('/notes', async(req, res)=>{
    let {title, description} = req.body;
    // console.log({title, description});
    
    await noteModel.create({
        title, description
    })
    res.json({
        message: 'Note created successfully!'
    })
})

app.get('/notes', async(req, res)=>{
    let notes = await noteModel.find(); //fetch all notes from MongoDB
    console.log(notes);
    
    res.json({
        message: 'Notes fetched successfully!',
        notes
    })
})

app.delete('/notes/:id', async(req, res)=>{
    let id = req.params.id;
   await noteModel.findOneAndDelete(
    {
        _id: id
    }
)
    res.json({
      message: 'Note deleted successfully!'
    })
})

app.patch('/notes/:id', async(req, res)=>{
    let id = req.params.id;
    let {title, description} = req.body;
    await noteModel.findOneAndUpdate({
        _id: id      
    },
    {
        title,
        description
    }
    )
    res.json({
        message: 'Note Updated Successfully!'
    })
})

app.listen(3000, (req, res) => {
    console.log('App is running on the port 3000');
})