const bcrypt = require('bcryptjs'),
      db = require('../../db/config')
      
      const Codes= {
      findCode:(code)=>{
            // request code that it's equal 
        return db.query(`SELECT * FROM codes WHERE code ='${code}'`);
      }
    }
    module.exports = Codes;