const mailgun = require("mailgun-js");
const  dotenv = require('dotenv').config()

const DOMAIN = process.env.MAILGUN_DOMAIN 
const APIKEY = process.env.MAILGUN_API_KEY 
const mg = mailgun({apiKey: APIKEY, domain: DOMAIN});


// const mailer = require('../../lib/mailer')

function sendStaffContactEmail (req, res,next) {
   
    let {email ,message} = req.body
    const data = {
        from: `${email}`,
        to: `bianca@helloiconic.com`,
        subject: 'Contact',
        text: `${message}`
    };
    mg.messages().send(data, function (error, body) {
        if(error){
            console.log("Error on mailgun contact email ", error)
            // res.send(error)
        }else{
            console.log("email sent successfully", body)
            return next()
        } 
    });
  }
  function sendVerifyEmail (req, res,next) {
    let {talentName, contactName, email, phoneNumber, bio, socialMediaLink} = req.body
    console.log("message received", talentName)
    const data = {
        from: `${email}`,
        to: email,
        subject: "IMDB Profile Verification",
        template: "verify",
        "h:X-Mailgun-Variables": `{"name": "${talentName}","contactName": "${contactName}","PhoneNumber": "${phoneNumber}","bio": "${bio}","socialMediaLink": "${socialMediaLink}"}`
    };

    console.log("data sending", data)
    // mg.messages().send(data, function (error, body) {
    //     if(error){
    //         console.log("Error on mailgun contact email ", error)
    //         // res.send(error)
    //     }else{
    //         console.log("email sent successfully", body)
    //         return next()
    //     } 
    // });
  }

  function sendConfirmation (req, res) {
      console.log('this is after sent ',req.body)
    let {name, email} = req.body
    const data = {
        from: "Mailgun Sandbox <postmaster@sandboxc404973b20024fa383a2f2bfa3b3fe8b.mailgun.org>",
        to: email,
        subject: "IMDB LAT Welcome",
        template: "contact",
        "h:X-Mailgun-Variables": `{"name": "${name}"}`
    };
    mg.messages().send(data, function (error, body) {
        console.log(body);
        res.send(body)
    });
  }

module.exports = {

    sendStaffContactEmail,
    sendVerifyEmail,
    sendConfirmation 

  }
  
