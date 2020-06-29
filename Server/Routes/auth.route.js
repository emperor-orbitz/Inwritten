var express = require('express');
var controller = require("../Controllers/auth.controller");
var router = express.Router();
var passport = require("passport");


/*
*          AUTH ROUTES
*/


router.post('/auth/isloggedin',
passport.authenticate("jwt", {session:false}),
 (req, res, next) => {   
    controller.isloggedin(req, res, next);
    
})



router.post('/auth/login',  (req, res, next) => {   
controller.login(req, res, next);

})

router.post('/auth/register',  (req, res, next) => {

controller.register(req, res);
})

router.get('/auth/verify_mail/:userid', (req, res, next) => {

controller.verify_mail(req, res, next);
})


router.post('/auth/send_mail/:userid', (req, res, next) => {
controller.send_mail(req, res, next);

})


router.get('/auth/api', (req, res, next) => {
controller.api(req, res, next);

})

router.post('/auth/reset_password', (req, res, next) => {
    controller.reset_password(req, res, next);
    
    })


    
  
router.get('/auth/change_password_page', (req, res, next) => {
    controller.change_password_page(req, res, next);
    
    })  

  
    router.post('/auth/change_password_page_submit', (req, res, next) => {
        controller.change_password_page_submit(req, res, next);
        
        })  


//TESTING 
router.get('/test-email-template', (req, res, next) => {
    controller.testemail(req, res, next);
    
    })




router.get('/auth/admin/secret/one-way-road', (req, res, next) => {
    controller.admin_login(req, res, next);
    
    })
    


module.exports = router;