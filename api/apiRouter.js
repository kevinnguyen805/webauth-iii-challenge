const express = require('express')
const router = express.Router();
const authRouter = require('../auth/authRouter.js')
const usersRouter = require('../users/usersRouter.js')

router.use('/auth', authRouter)
router.use('/users', usersRouter)

router.get('/', (req,res) => {
     res.send('Hello! You are at the root of /api router')
})

module.exports = router;