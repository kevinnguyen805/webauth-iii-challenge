const express = require('express')
const router = express.Router();
const authRouter = require('../auth/authRouter.js')
const usersRouter = require('../users/usersRouter.js')

server.use('/auth', authRouter)
server.use('/users', usersRouter)

server.get('/', (req,res) => {
     res.send('Hello! You are at the root of /api router')
})

module.exports = router;