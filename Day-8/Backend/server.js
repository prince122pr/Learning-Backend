const app = require('./src/app.js');
const connectDB = require('./src/db/db.js');

require('dotenv').config();

let port = process.env.PORT || 3000

connectDB();

app.listen(port, ()=>{
    console.log(`Server is running on the port ${port}`);
})