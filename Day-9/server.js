const app = require("./src/app");

const { createServer } = require("http");
const { Server } = require("socket.io");

// We're using http.createServer(app) because Socket.IO needs a raw HTTP server to work.
// Express app alone can't handle WebSocket connections — it's just a function for routing.
// So we wrap Express inside HTTP to get both: HTTP + Express features.
// Without http, Socket.IO won't work — it must attach to the actual server.

const httpServer = createServer(app);
const io = new Server(httpServer, { });

io.on("connection", (socket) => {
 
});


httpServer.listen(3000, ()=>{
    console.log('Server is running on the port 3000');
})