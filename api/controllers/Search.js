const Search = require ('../models/Search'),
        router = require('express').Router()

//get simple search from any of the table columns
router.get('/:id', (req, res) => {

    Search
        .findQuery(req.params.id)
        .then(profiles => {
            console.log('inside THEN',profiles);
            res.json(profiles);
        })
        .catch(err => console.log('error from simple query', err));
});
// advanced query
router.get('/advanced/:id', (req, res) => {
    let data = JSON.parse(req.params.id);
    Search
        .findAdvancedQuery(data)
        .then(profiles => {       
            res.json(profiles);
        })
        .catch(err => console.log('error from simple query', err));
});

// query to show only one profile 



module.exports= router; 