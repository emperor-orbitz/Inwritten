var express = require('express');
var controller = require("../Controllers/comments.controller");
var router = express.Router();
var passport = require("passport");


/*
*          AUTH ROUTES
*/


// router.post('/auth/isloggedin',
// passport.authenticate("jwt", {session:false}),
//  (req, res, next) => {   
//     controller.isloggedin(req, res, next);
    
// })



router.post('/comment/create',  (req, res, next) => {   
controller.create(req, res, next);

})

router.patch('/comment/update',  (req, res, next) => {   
    controller.update(req, res, next);
    
})

router.get('/comment/list',  (req, res, next) => {   
    controller.list(req, res, next);
    
})

router.delete('/comment/delete',  (req, res, next) => {   
    controller.delete(req, res, next);
    
})

router.patch('/comment/like',  (req, res, next) => {   
    controller.like(req, res, next);
    
})

module.exports = router;