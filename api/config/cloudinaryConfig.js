
const cloudinary = require("cloudinary");

const  dotenv = require('dotenv').config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


var self = module.exports = {
    
uploads:(file) => {
  return new Promise(resolve => {
    cloudinary.uploader.upload(
      file,
      result => {
        resolve({ result});
      },
      { resource_type: "auto" }
    );
  });
}
}

