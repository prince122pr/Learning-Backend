const http = require('http');

const server = http.createServer((req, res) => {
  // Send response body
  res.end('Hello, your server is working!');
});

server.listen(3000, () => {
  console.log('Server is running on the port 3000');
});
