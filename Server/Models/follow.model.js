
var mongoose = require('mongoose');
var scheme = require('./scheme');
var commentSchema = scheme.follow;


//BASIC CRUD FOR COMMENTS FIRST
//Create Comment






module.exports = mongoose.model('Follow', commentSchema);




