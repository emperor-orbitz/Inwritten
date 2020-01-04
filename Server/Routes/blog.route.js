
var Router = require('express').Router();
var blogController = require("../Controllers/blog.controller")
var passport= require("passport")

var isAuth = (req, res, next)=> {
    passport.authenticate("jwt", {session:false})
    (req, res, next);
    }
    



Router.get('/user/:link', function (req, res, next) {

    blogController.index(req, res)


})


Router.get('/user/profile/:username', function (req, res, next) {

    blogController.user(req, res)

})


Router.get('/user/blog/:username', function (req, res, next) {

    blogController.blog(req, res)

})

Router.post('/user/bookmark/:user_id/:blog_id', isAuth, function (req, res, next) {

    blogController.bookmark(req, res)

})


Router.get('/user/bookmark/list', isAuth, function (req, res, next) {

    blogController.list_bookmark(req, res)

})


Router.delete('/user/remove_bookmark/:bookmark_id', isAuth, function (req, res, next) {

    blogController.remove_bookmark(req, res)

})




module.exports = Router;

