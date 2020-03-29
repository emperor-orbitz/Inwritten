
var Router = require('express').Router();
var blogController = require("../Controllers/blog.controller")
var passport= require("passport")

var isAuth = (req, res, next)=> {
    passport.authenticate("jwt", {session:false})
    (req, res, next);
    }
    

    Router.get('/stories', function (req, res, next) {

        blogController.stories(req, res)
    
    })




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

Router.get('/user/blog/follow/follow_status', isAuth, function (req, res, next) {

    blogController.follow_status(req, res, next)

})

Router.post('/user/blog/follow/follow_user', isAuth, function (req, res, next) {

    blogController.follow_user(req, res, next)

})


Router.delete('/user/remove_bookmark/:bookmark_id', isAuth, function (req, res, next) {

    blogController.remove_bookmark(req, res)

})


Router.get('/user/blog/follow/other_interests', function (req, res, next) {

    blogController.other_interests(req, res, next)

})




module.exports = Router;

