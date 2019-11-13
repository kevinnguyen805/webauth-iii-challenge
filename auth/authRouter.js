const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Users = require('../users/usersModel.js')


//* POST - /auth/register */
// TODO: VALIDATE REGISTERING CREDENTIALS
router.post('/register', (req,res) => {
     const newUser = req.body;

     const validateU

})

//* POST - /auth/login */
// TODO: CREATE JWT AFTER VALID CREDENTIALS 
router.post('/login', (req,res) => {
     let { username, password } = req.body;

     if(username && password){
          Users
          .findBy(username)
          .then(response => {
               if(response && bcrypt.compareSync(password, response.password)){
                    const token = getJwtToken(response.username)

                    res.status(200).json({
                         message: `Welcome ${response.username}! Have a token...`,
                         token
                    })
               }
          })
     }
})

function getJwtToken(username){
     const payload = {
          username,
          department: 'full stack web development'
     }
     const secret = process.env.JWT_SECRET || 'is it secret? is it safe?';
     const options = {
          expiresIn:'1d'
     }
     return jwt.sign(payload, secret, options)
}



module.exports = router;


/*
TODO: create getJwtToken
1. payload
2. secret
3. options 
4. return the JSON Web Token with the signature method === (encodes payload, options, and signed with the secret) = string
*/