const Codes = require ('../models/Codes'),
        router = require('express').Router()



        router.get('/', (req, res) => {
            // require the code from the front end 
            let code = req.body.code
            Codes
               .findCode(code)
               .then(data => { // once we get them back
                     res.json(data)
               })
               .catch((err) => {
                 console.log('Profile Get Controller Index Error', err)
                })
            })

module.exports = router;