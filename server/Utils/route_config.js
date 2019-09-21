//first we import our dependencies…

var express = require('express'), router = express.Router();
var authenticate = require('../Routes/auth.route');
var articles = require('../Routes/articles.route');
var profile = require('../Routes/profile.route');
//var blog_page = require('../Routes/blog.route');




router.use(['/','/api','/blog', '/signup', '/login', '/logout', '/account', '/isloggedin', '/update_profile'],
 [authenticate, articles, profile ]);



module.exports = router;