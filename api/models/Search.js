const bcrypt = require('bcryptjs'),
      db = require('../../db/config')
      
const Search= {
    // get all by query
    findQuery: (query)=>db.query(`SELECT * FROM profile WHERE name LIKE '%${query}%' OR 'role_type' ILIKE '%${query}%' OR production LIKE '%${query}%'`),
    findAdvancedQuery:(queries)=>{

       // if profiles return 0 make another request and show ppl within the range
      //  if credit is writers or directors, and age don't return make another request 
        const {credit,gender,country, age} = queries
        let sql = 'SELECT * FROM profile WHERE 1 = 1 ';
    
        if (credit !== undefined && credit !== '') { 
          sql += `AND credit ='${credit}'` ;
        }
        if (gender !== undefined && gender !== '') {
          sql +=  `AND gender ='${gender}'` ;
        }
        if (country !== undefined &&country !== '') {
          sql +=  `AND country ='${country}'` ;
        }
        // this should be age && 
        if(age.min !== '' || age.max !== '' ){
          sql += `AND DATE_PART('year', now()::date) - DATE_PART('year', dob::date) BETWEEN ${age.min} AND ${age.max}`;
        }
        return db.query(sql);
    }
}

module.exports = Search;


