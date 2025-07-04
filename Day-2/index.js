const express = require('express');

let app = express();

app.use(express.json());//Ye ek middleware hai jo incoming request ke body ko read karta hai. Agar body JSON format mein hai, to ye usko JavaScript object mein convert kar deta hai, taaki aap isko req.body se access kar sako.

app.get('/', (req, res)=>{
    res.send('Home Page')
})

// create notes app with postman
let notes = [];

app.post('/notes', (req, res)=>{
    console.log(req.body);
    notes.push(req.body);
    res.json({
        message:"Note added successfully",
        notes
    })
    
})

app.listen(3000, ()=>{
    console.log('App is running on the port 3000');
})