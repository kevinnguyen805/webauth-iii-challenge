const express = require('express')
const configureMiddleware = require('./api/configureMiddleware.js')
const apiRouter = require('./api/apiRouter.js')

const server = express();
configureMiddleware(server);

server.use('/api', apiRouter)
server.get('/', (req,res) => {
     res.send("Hello you are at the root of the server")
})


module.exports = server;