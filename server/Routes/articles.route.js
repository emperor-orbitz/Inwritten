var express = require('express');
var controller = require("../Controllers/articles.controller");
var router = express.Router();
var passport = require("passport");
                                                                         


var isAuth = (req, res, next)=> {
passport.authenticate("jwt", {session:false})
(req, res, next);
}




/*
         ARTICLE ACTIONS

*/


router.get('/articles/loadlist', isAuth, (req, res, next) => {   
controller.loadList(req, res, next);

});


router.post('/articles/delete', isAuth, (req, res, next) => {

controller.deletePost(req, res);
});


router.post('/articles/loadAllList', isAuth, (req, res, next) => {

controller.loadAllList(req, res, next);
});


router.post('/articles/update', isAuth, (req, res, next) => {
controller.update(req, res, next);

});

router.post('/articles/create', isAuth, (req, res, next) => {
controller.create(req, res, next);

})


router.post('/articles/article', isAuth, (req, res, next) => {

controller.article(req,res);
});





module.exports = router;