const express = require('express')
const configureMiddleware = require('./configureMiddleware.js')
const apiRouter = require('./apiRouter.js')

const server = express();
configureMiddleware(server);

server.use('/api', apiRouter)
server.get('/', (req,res) => {
     res.send("Hello you are at the root of the server")
})


module.exports = server;