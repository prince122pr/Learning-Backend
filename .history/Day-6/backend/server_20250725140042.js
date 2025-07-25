let app = require('./src/app.js');
const connectToDB = require('./src/db/db.js');

connectToDB()

app.listen(3000, ()=>{
    console.log('Server is running on the port 3000');
}) 