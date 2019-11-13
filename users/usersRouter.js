const express = require('express')
const router = express.Router();
const authMiddleware = require('../auth/authMiddleware.js');
const Users = require('./usersModel.js')


//* POST - /users */
// TODO: VALIDATE JWT (SECRET) TO GET TO ENDPOINT
router.get('/', authMiddleware, checkDepartment('full stack web development'), (req,res) => {
     Users.find()
     .then(response => {
          res.status(200).json(response)
     })
     .catch(error => {
          res.status(500).json({message: "Unable to retrieve all users"})
     })
})

module.exports = router;





//TODO: ANOTHER AUTHENTICATION MIDDLEWARE FOR ROLES
function checkDepartment(department){
     return function(req, res, next){
          if(department.includes(req.decodedJwt.department)){
               next();
          } else {
               res.status(403).json({message: "Sorry! You do not have the right department/credentials"})
          }
     }
}