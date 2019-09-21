var blogModel = require('../Models/blog.model');
var Router =require('express').Router();


Router.get('/blog/:author/:title', function(req, res, next){
console.log(req.params.author);

})

module.exports =Router;

