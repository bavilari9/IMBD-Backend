const cloudinary = require("cloudinary").v2
const  dotenv = require('dotenv').config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


var self = module.exports = {
    
uploads:(file) => {
  console.log("FILE FROM UPLOAD ", file )
  return new Promise(resolve => {
    cloudinary.uploader.upload_stream(
      file,
      result => {
        resolve({ result});
      },
      { resource_type: "auto" }
    );
  });
}
}

