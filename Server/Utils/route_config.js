var express = require('express'), router = express.Router();
var authenticate = require('../Routes/auth.route');
var articles = require('../Routes/articles.route');
var profile = require('../Routes/profile.route');
var comments = require('../Routes/comments.route');
var blog = require("../Routes/blog.route")
var template = require("../Routes/template.route")
var home = require("../Routes/home.route")




router.use( home, authenticate, articles, profile,comments, blog, template );



module.exports = router;