let app = require('./src/app.js');
const connectToDB = require('./src/db/db.js');

require('dotenv').config();

connectToDB();

console.log("Public Key: ", process.env.IMAGEKIT_PUBLIC_KEY);


app.listen(3000, ()=>{
    console.log('Server is running on the port 3000');
}) 
