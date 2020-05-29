
var mongoose = require('mongoose');
var scheme = require('./scheme');
var subscriberSchema = scheme.subscribers;










module.exports = mongoose.model('Subscriber', subscriberSchema);



