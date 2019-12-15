var express = require('express');
var controller = require("../Controllers/articles.controller");
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


router.get('/articles/loadlist', isAuth, (req, res, next) => {   
controller.loadList(req, res, next);

});


router.delete('/articles/delete', isAuth, (req, res, next) => {

controller.deletePost(req, res);
});


router.get('/articles/loadAllList', isAuth, (req, res, next) => {

controller.loadAllList(req, res, next);
});


router.patch('/articles/update', isAuth, (req, res, next) => {
controller.update(req, res, next);

});

router.post('/articles/create', isAuth, (req, res, next) => {
controller.create(req, res, next);

})


router.post('/articles/article', isAuth, (req, res, next) => {

controller.article(req,res);
});

router.patch('/articles/like', isAuth, (req, res, next) => {
    controller.like(req, res, next);
    
});
    




//Load list of interests based on post category from everyone's post
router.get('/articles/interests', isAuth, (req, res, next)=>{
controller.interests(req, res, next)
})



module.exports = router;