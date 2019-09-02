//first we import our dependencies…

var express = require('express'), router = express.Router();
var authenticate = require('../routes/authenticate');
var articles = require('../routes/articles');
var profile = require('../routes/profile');
var blog_page = require('../routes/blog_page');




router.use(['/','/api','/blog', '/signup', '/login', '/logout', '/account', '/isloggedin', '/update_profile'], [authenticate, articles, profile, blog_page]);



module.exports = router;