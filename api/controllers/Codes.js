const CryptoJS = require("crypto-js");
const Codes = require ('../models/Codes'),
router = require('express').Router()


router.get('/checkCode', (req, res) => {
  console.log("cookies", req.cookies)
  // res.clearCookie('early-access-code');
  res.json({
    exists: Boolean(req.cookies && req.cookies['early-access-code'])
  });
});
router.get('/', (req, res) => {
  
  // require the code from the front end 
  let code = req.query.code;
  Codes
  .findCode(code)
  .then(data => { // once we get them back
    console.log("@data", data)
    if (data && data.length > 0) {
      const cipherCode = CryptoJS.AES.encrypt(code, 'SECRET_KEY');
      res.setHeader('Cache-Control', 'private');
      res.cookie("early-access-code", cipherCode.toString())
      res.json({
        valid: true,
        hashCode: cipherCode.toString()
      });
    } else {
      res.json({
        valid: false
      })
    }
  })
  .catch((err) => {
    console.log('Profile Get Controller Index Error', err)
  })
})

module.exports = router;