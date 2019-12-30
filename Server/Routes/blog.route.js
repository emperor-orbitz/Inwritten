
var Router = require('express').Router();
var blogController = require("../Controllers/blog.controller")
var passport= require("passport")


var isAuth = (req, res, next)=> {
  
    passport.authenticate("jwt", {session:false}, (err, user, info)=>{
        if(err){
            return next(err)
        }
        else{
           //console.log("Nice", user, info)
            next()
        }
    })
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

module.exports = Router;

