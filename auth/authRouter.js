const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Users = require('../users/usersModel.js')
const authRegistration = require('../users/usersHelper.js')

//* POST - /auth/register  ==> returns obj with ID, username, password, department */
// TODO: VALIDATE REGISTERING CREDENTIALS 
router.post('/register', (req,res) => {
     const newUser = req.body;

     const validateUser = authRegistration(newUser)

     if(validateUser.isSuccessful === true){
          const hash = bcrypt.hashSync(newUser.password,12)
          newUser.password = hash

          Users.add(newUser)
          .then(response => {
               res.status(201).json(response)
          })
          .catch(error => {
               res.status(500).json(error)
          })
     } else {
          res.status(500).json({
               message: "Invalid credentials",
               error: validateUser.errors
          })
     }


})

//* POST - /auth/login */
// TODO: CREATE JWT AFTER VALID CREDENTIALS 
router.post('/login', (req,res) => {
     let { username, password } = req.body;

     
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
     
})

function getJwtToken(username){
     const payload = {
          username,
          department: 'full stack web development'
     }
     const secret = process.env.JWT_SECRET || 'hello my name is kevin'
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