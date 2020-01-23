const mailgun = require("mailgun-js");
const  dotenv = require('dotenv').config()

const DOMAIN = process.env.MAILGUN_DOMAIN 
const APIKEY = process.env.MAILGUN_API_KEY 
const SANDBOX_URL = process.env.SANDBOX_URL
const DESTINATARY = process.env.DESTINATARY
const mg = mailgun({apiKey: APIKEY, domain: DOMAIN});

// staf contact form
function sendStaffContactEmail (req, res,next) {
   
    let {email ,message} = req.body
    const data = {
        from: `${email}`,
        to: `${DESTINATARY}`,
        subject: 'Contact',
        text: `${message}`
    };
    mg.messages().send(data, function (error, body) {
        if(error){
            console.log("Error on mailgun contact email", error)
            return next(500)
        }else{
            console.log("email sent successfully", body)
            return next()
        } 
    });
  }
  //Profile verification of talent profile
  function sendVerifyEmail (req, res,next) {
    let {talentName, name, email, phoneNumber, bio, socialMediaLink} = req.body
    console.log("verification email", name)
    const data = {
        from:`Mailgun Sandbox ${SANDBOX_URL}`, 
        to: email,
        subject: "IMDB Profile Verification",
        template: "verify",
        "h:X-Mailgun-Variables": `{"name": "${name}","name": "${talentName}","phoneNumber": "${phoneNumber}","socialMediaLink": "${socialMediaLink}", "bio": "${bio}"}`
    };
    mg.messages().send(data, function (error, body) {
        if(!error){
            console.log("email sent successfully", body)
            return next()
        }else{
            console.log("there was an error sending verification email", error)

            return next(500)
            
        } 
    });
  }

  
//   confirmation email after contact /verification email is sent 
  function sendConfirmation (req, res,next) {
      console.log('this is after sent ',req.body)
    let {name, email} = req.body
    const data = {
        from:`Mailgun Sandbox ${SANDBOX_URL}`,
        to:email,
        subject: "IMDB LAT Welcome",
        template: "contact",
        "h:X-Mailgun-Variables": `{"name": "${name}"}`
    };
    mg.messages().send(data, function (error, body) {

        if(error){
            console.log("Error on mailgun confirmation contact email ", error)
           return next(500)
        }else{
            console.log("email sent successfully to user", body)
            res.send(body)
        } 
       
    })
  }

module.exports = {

    sendStaffContactEmail,
    sendVerifyEmail,
    sendConfirmation 

  }
  
