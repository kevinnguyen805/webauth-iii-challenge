const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

     const token = req.headers.authorization;

     if(token){
          const secret = process.env.JWT_SECRET || 'hello my name is kevin'
          
          jwt.verify(token, secret, (error, decodedToken) => {
               if(error){
                    res.status(401).json({message: " You provided invalid credentials"})
               } else {
                    req.decodedJwt = decodedToken;
                    next();
               }
          })
     } else {
          res.status(400).json({message: "credentials provided"})
     }

}

/*
TODO: STEPS ---- RESTRICTED ENDPOINT JWT MIDDLEWARE
1. import jsonwebtoken
2. grab the token from authorization key in headers
3. check if there is a token
     - if there is a token....
          - grab the secret in your code 
          - verify the secret (using verify method on jsonwebtoken module) with the secret inside the token
               - if the secret DOES NOT  match - error will send a 401
               - if the secret DOES match 
                    - the decoded token will be stored in the request object
                    - next()
     
*/