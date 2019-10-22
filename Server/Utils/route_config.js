var express = require('express'), router = express.Router();
var authenticate = require('../Routes/auth.route');
var articles = require('../Routes/articles.route');
var profile = require('../Routes/profile.route');
var comments = require('../Routes/comments.route');




router.use(['/','/api','/blog', '/signup', '/login', '/logout', '/account', '/isloggedin', '/update_profile'],
 [authenticate, articles, profile,comments ]);



module.exports = router;