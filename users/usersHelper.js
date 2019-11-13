module.exports = { validateUser }

// TODO: VALIDATE REGISTERING CREDENTIALS
function validateUser(user){
     let errors = [];

     if(!user.username || user.username < 2){
          errors.push('Please include a username that is more than 2 characters')
     }

     if(!user.password || user.password < 4){
          errors.push('Please includes a password that is more than 4 characters')
     }

     return{
          isSuccessful: errors.length > 0 ? false : true,
          errors
     }
}


