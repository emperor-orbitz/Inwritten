
var mongoose = require('mongoose');
var scheme = require('./scheme');
var socialSchema = scheme.socials;










module.exports = mongoose.model('Social', socialSchema);



