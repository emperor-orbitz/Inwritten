
var Router = require('express').Router();
var blogController = require("../Controllers/blog.controller")
var passport= require("passport")

var isAuth = (req, res, next)=> {
    passport.authenticate("jwt", {session:false})
    (req, res, next);
    }
    


    Router.get('/user/:username', function (req, res, next) {
        console.log("I GOT HEREYYOYOYYY")
        blogController.user(req, res)
    
    })

    
    Router.get('/stories', function (req, res, next) {

        blogController.stories(req, res)
    
    })

    
    Router.post('/blog/fivestories', function (req, res, next) {

        blogController.five_posts(req, res)
    
    })

    Router.post('/blog/trending', isAuth, function (req, res, next) {

        blogController.trending(req,res, next)
    
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


Router.get('/user/:username/:chunk', function (req, res, next) {

    blogController.index(req, res)

})







Router.post('/user/blog/editorspick', isAuth, function (req, res, next) {

    blogController.editorspick(req,res, next)

})



module.exports = Router;

