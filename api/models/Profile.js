const bcrypt = require('bcryptjs'),
      db = require('../../db/config')
      
const Profile = {
    // get all profiles 
    findAll: ()=> db.any(`SELECT * FROM profile order by ID DESC`), 
    findCountries:()=> db.any(`SELECT DISTINCT country FROM profile`),
    //create Profile
    create:(name,gender,dob,production,network,season, country,credit,imdb_link,imgLink,main_profile)=>{
        return db.one(
            `INSERT INTO profile(name,gender,dob,production,network,season,country,credit,imdb_link,imgLink,main_profile)
            VALUES($1, $2,$3, $4,$5,$6,$7,$8, $9,$10, $11) returning *`,
            [name,gender,dob,production,network,season, country,credit,imdb_link,imgLink,main_profile]
        )
    },
    update:(profile,Id)=>{
        return db.oneOrNone(`UPDATE profile
        SET name=$1,gender=$2,dob=$3,production=$4,network=$5,season=$6,country=$7,credit=$8,imdb_link=$9,imgLink=$10,main_profile=$11
        WHERE id = $12 RETURNING id`,
         [profile.name, 
        profile.gender,
        profile.dob,
        profile.production,
        profile.network,
        profile.season,
        profile.country ,
        profile.credit,
        profile.imdb_link,
        profile.imgLink,
        profile.main_profile,
        Id]
        );    
    },
    delete: (id) => db.none('DELETE FROM profile WHERE id = $1 ', [id])
    // todo  edit 
}


module.exports = Profile;