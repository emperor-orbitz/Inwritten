var express = require('express'), router = express.Router();
var authenticate = require('../Routes/auth.route');
var articles = require('../Routes/articles.route');
var profile = require('../Routes/profile.route');
var comments = require('../Routes/comments.route');
var blog = require("../Routes/blog.route")
var template = require("../Routes/template.route")
var home = require("../Routes/home.route")
var notifications = require("../Routes/notifications.route")
var drafts = require("../Routes/drafts.route")
var admin = require("../Routes/admin.route")




router.use( authenticate, profile);
//I Removed ARTICLES and DRAFTS


module.exports = router;