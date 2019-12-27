var Router = require('express').Router();
var blogController = require("../Controllers/blog.controller")



Router.get('/user/:link', function (req, res, next) {
    
    blogController.index(req, res)

})


Router.get('/user/profile/:username', function (req, res, next) {

    blogController.user(req, res)

})


Router.get('/user/blog/:username', function (req, res, next) {

    blogController.blog(req, res)

})

module.exports = Router;

