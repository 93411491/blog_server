const http = require('http')

const port = 8000
const serverHandler = require('../app')

const server = http.createServer(serverHandler)

server.listen(port)

console.log(`service start ok`);
