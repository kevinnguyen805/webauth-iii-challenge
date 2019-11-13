const db = require('../data/db-config.js')

module.exports = {
     add,
     find,
     findBy,
     findById
}

function find(){
     return db('users')
     .select('id', 'username', 'password')
}

//TODO - make sure to include the role information
function findBy(filter){
     return db('users')
     .where('username', '=', filter)
     .first()
}

//TODO - remember to add first() when looking for ID so you can take obj out of array
function findById(id){
     return db('users')
     .where('id', '=', id)
     .first()
}

function add(newUser){
     return db('users').insert(newUser).then(([id]) => findById(id))
}