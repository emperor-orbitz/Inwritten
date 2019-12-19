var express = require('express'), router = express.Router();
var authenticate = require('../Routes/auth.route');
var articles = require('../Routes/articles.route');
var profile = require('../Routes/profile.route');
var comments = require('../Routes/comments.route');
var blog = require("../Routes/blog.route")




router.use([authenticate, articles, profile,comments, blog ]);



module.exports = router;