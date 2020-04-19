var express = require('express');
var controller = require("../Controllers/home.controller");
var router = express.Router();
var passport = require("passport");
var valid = require("../Utils/validation");                                                                       



var isAuth = (req, res, next)=> {
passport.authenticate("jwt", {session:false})
(req, res, next);
}




/*
         ARTICLE ACTIONS

*/


router.get('/', (req, res, next) => {  

controller.index(req, res, next);

});

router.get('/terms-and-conditions', (req, res, next) => {  

    controller.terms_and_conditions(req, res, next);
    
});

router.post('/subscribeToPreLaunch', (req, res, next) => {  

    controller.subscribe(req, res, next);
    
});


module.exports = router;