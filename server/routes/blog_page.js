var blogModel = require('../model/blog');
var Router =require('express').Router();


Router.get('/blog/:author/:title', function(req, res, next){
console.log(req.params.author);

})

module.exports =Router;

