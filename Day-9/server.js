console.clear()

const app = require("./src/app");

require('dotenv').config();

const { createServer } = require("http");
const { Server } = require("socket.io");
const generateResponse = require("./src/services/ai.service");
const { log } = require("console");

// We're using http.createServer(app) because Socket.IO needs a raw HTTP server to work.
// Express app alone can't handle WebSocket connections — it's just a function for routing.
// So we wrap Express inside HTTP to get both: HTTP + Express features.
// Without http, Socket.IO won't work — it must attach to the actual server.

const httpServer = createServer(app);
const io = new Server(httpServer, { });

let chatHistory = []


io.on("connection", (socket) => {
   console.log('A user connected!');

   socket.on('disconnect', ()=>{
   console.log('A user disconnected!');
     
   })

   // custom events
   socket.on('message', ()=>{
     console.log('Message received');
     
   })

    socket.on('test-event', (data)=>{
     console.log(data);
     
   })

   socket.on('ai-message', async(data)=>{
    
     
     chatHistory.push({
       role: "user",
       parts: [{ text: data }],
      },)
      console.log(`Received Message: ${data}`);  
      
    const response = await generateResponse(chatHistory);

    chatHistory.push( {
        role: "model",
        parts: [{ text: response }],
      },)
    
    console.log(response);
    
    socket.emit("ai-message-response", response);
      
   })

});


httpServer.listen(3000, ()=>{
    console.log('Server is running on the port 3000');
})