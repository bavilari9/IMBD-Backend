const Profile = require ('../models/Profile'),
        router = require('express').Router(),
        upload = require('../middlewares/multer')

        self= require('../../config/cloudinaryConfig')

   
        // // multerUploads = require('../../middleware/multer'),
        // // dataUri = require('../../middleware/multer'
router.post('/',upload.single('photo'),(req, res)=>{    
    
    console.log('req.file :', req.file);

    // var imageDetails = {
    //     imageName: req.body.imageName,
    //     cloudImage: req.files[0].path,
    //     imageId: ''
    //     }

    self.uploads(req.body.imgLink).then((result) => {
       console.log("result ", result )
        })

    // if(req.file) {
    //     const file = dataUri(req).content;
    //     return uploader.upload(file).then((result) => {
    //     const image = result.url;
    //     return res.status(200).json({
    //     messge: 'Your image has been uploded successfully to cloudinary',
    //     data: {
    //     image
    //     }
    //     })
    //     }).catch((err) => res.status(400).json({
    //     messge: 'someting went wrong while processing your request',
    //     data: {
    //     err
    //     }
    //     }))
    //     }


//    const {name,gender,dob,production,network,season, country,credit,imdb_link,main_profile} = req.body;
//    const errors = {
//     name:[],
//     gender:[],
//     dob:[],
//     production:[],
//     network:[],
//     season:[],
//     country:[],
//     credit:[],
//     imdb_link:[],
//     main_profile:[]
//     };
//     let error = false; 

//     cloudinary.uploader.upload("sample.jpg", {"crop":"limit","tags":"samples","width":3000,"height":2000}, function(result) { console.log(result) });
    // if(!error){
    //     Profile.create(name,gender,dob,production,network,season, country,credit,imdb_link,main_profile)
    //     .then(data=>{
    //         console.log(data)
    //         res.json(data)
    //     })
    //     .catch(err=>console.log(err))
    // }else{
    //     res.status(400).json({errors: errors})
    // }

})
router.get('/', (req, res) => {
       Profile
          .findAll()
          .then(data => { // once we get them back
                res.json(data)
          })
          .catch((err) => {
            console.log('Profile Get Controller Index Error', err)
          });
})
// get countries
router.get('/countries', (req, res) => {
    Profile
       .findCountries()
       .then(data => { // once we get them back
             res.json(data)
       })
       .catch((err) => {
         console.log('Profile Get Countries Controller Index Error', err)
       });
})

//get individual id  
router.get('/:id', (req, res) => {
    Profile
        .findById(req.params.id)
        .then(spot => {
            res.render('destinations/edit', spot);
        })
        .catch(err => console.log('error from edit destination', err));
});
// edit entry 
router.put('/:id', (req, res) => {
    console.log('req', req.body[0])
    Profile
        .update(req.body[0], req.params.id)
        .then(destination => {

            res.json(destination);
        })
        .catch(err => {
            console.log('error in put ', err);

        });
});

router.delete('/:id', (req, res) => {
      const id = req.params.id;
      console.log(id)
      Profile.delete(id)
         .then((data) => {
              res.send('deleted from DB')
          })
          .catch(err => { console.log('constroller error on delete', err) 
      })
  })

module.exports= router; 