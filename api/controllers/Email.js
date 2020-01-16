const router = require('express').Router(),
        {sendStaffContactEmail, sendConfirmation, sendVerifyEmail} = require('../middlewares/mail')


        router.route('/')
        .post(sendStaffContactEmail, sendConfirmation)  

        router.route('/verify')
        // .post(sendVerifyEmail)  
        .post(sendVerifyEmail, sendConfirmation)  

module.exports = router;
 