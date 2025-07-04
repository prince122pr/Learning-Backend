let express = require('express');

let app = express();

app.use(express.json());

let notes = [];

// to create notes
app.post('/notes', (req, res)=>{
//    console.log(req.body);
notes.push(req.body);
    res.json({
        message: 'Note created successfully!'
    })
})

// to get notes
app.get('/notes', (req, res)=>{
    res.json(notes)
})

// let's delete note 
app.delete('/notes/:idx', (req, res)=>{
    let index = req.params.idx;
    delete notes[index]
    res.json({
        message: 'Note deleted successfully!'
    })
})

// let's change title of particular index
app.patch('/notes/:idx', (req, res)=>{
    let index = req.params.idx;
    let {title, description} = req.body;
    notes[index].title = title
    res.json({
        message: 'Note updated successfully'
    })
})


app.listen(3000, ()=>{
    console.log(`App is running on the port 3000`);
})