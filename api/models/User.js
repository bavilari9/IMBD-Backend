const bcrypt = require('bcryptjs'),
	  db = require('../../db/config')


const User = {

  // model method to create a user
  create: (name, email,password) => {
    // encrypt the password using bcrypt
    const password_digest = bcrypt.hashSync(password, 10);
    const generateTokenAndCreate = () => {
    const token = bcrypt.hashSync(Math.random().toString(), 10);
      // egetting the token from database 
      return db.oneOrNone('SELECT id FROM users WHERE token = $1', [token])
        .then((res) => { 
          if(res){ 
            return generateTokenAndCreate();
          } 
          return db.one(`INSERT INTO users
            (name, email, password_digest, token)
            VALUES ($1, $2, $3, $4)
            RETURNING name, email, token, id`, // the information we want to send back
            [name, email,password_digest, token])
        })
        .catch(err => {
          console.log(err)
        });
    }

    return generateTokenAndCreate();
  },

 
  findByEmail: (email) => db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]),
  findByToken: (token) => db.one('SELECT * FROM users WHERE token = $1', [token])
}

module.exports = User;
