const Profile = require("../models/Profile"),
  router = require("express").Router(),
  { upload, dataUri } = require("../middlewares/multer");
cloud = require("../config/cloudinaryConfig");

router.post("/", (req, res) => {
  const { name,gender,dob,production,network,season,country,credit,imdb_link,imgLink,main_profile} = req.body;
  const errors = {name: [], gender: [],dob: [],production: [],network: [],season: [],country: [],credit: [],imdb_link: [],imgLink:[],main_profile: []};
  let error = false;
  if (!error) {
    Profile.create(
      name,
      gender,
      dob,
      production,
      network,
      season,
      country,
      credit,
      imdb_link,
      imgLink,
      main_profile
    ).then(data => {
        console.log("response", data)
        res.json(data);
      })
      .catch(err => console.log(err));
  } else {
    res.status(400).json({ errors: errors });
  }
});
router.post("/photo", upload.single("imgLink"), (req, res) => {
  let file = dataUri(req).content;
  cloud
    .uploads(file)
    .then(result => {
        const url = result.result.url;
        console.log("URL", url);
        res.json(url)
    }).catch(e => {
      console.log("error on uploading photo", e);
      res.status(400).json({ e });
    });
});

router.get("/", (req, res) => {
  Profile.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log("Profile Get Controller Index Error", err);
    });
});
// get countries
router.get("/countries", (req, res) => {
  Profile.findCountries()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log("Profile Get Countries Controller Index Error", err);
    });
});

//get individual id
router.get("/:id", (req, res) => {
  Profile.findById(req.params.id)
    .then(spot => {
      res.render("destinations/edit", spot);
    })
    .catch(err => console.log("error from edit destination", err));
});
// edit entry
router.put("/:id", (req, res) => {
  console.log("req", req.body[0]);
  Profile.update(req.body[0], req.params.id)
    .then(destination => {
      res.json(destination);
    })
    .catch(err => {
      console.log("error in put ", err);
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  Profile.delete(id)
    .then(data => {
      res.send("deleted from DB");
    })
    .catch(err => {
      console.log("constroller error on delete", err);
    });
});

module.exports = router;
