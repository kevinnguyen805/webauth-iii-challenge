const express = require('express')
const router = express.Router();
const authMiddleware = require('../auth/authMiddleware.js');
const Users = require('./usersModel.js')


//* GET - /users */
// TODO: VALIDATE JWT (SECRET) TO GET TO ENDPOINT
// test by using HEADERS not AUTHENTICATION
router.get('/', authMiddleware, checkDepartment('full stack web development'), (req,res) => {
     Users.find()
     .then(response => {
          res.status(200).json(response)
     })
     .catch(error => {
          res.status(500).json({message: "Unable to retrieve all users"})
     })
})


router.post('/', (req,res) => {
     const { department } = req.body

     Users.findByDepartment(department)
     .then(response => {
          res.status(200).json(response)
     })
     .catch(error => {
          res.status(500).json({message: "Unable to find users in department"})
     })
})


module.exports = router;





//TODO: ANOTHER AUTHENTICATION MIDDLEWARE FOR DEPARTMENT
function checkDepartment(department){
     return function(req, res, next){
          if(department === req.decodedJwt.department){
               next();
          } else {
               res.status(403).json({message: "Sorry! You do not have the right department/credentials"})
          }
     }
}