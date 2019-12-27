
var mongoose = require('mongoose');
var scheme = require('./scheme');
var templateSchema = scheme.template;










module.exports = mongoose.model('Template', templateSchema);







