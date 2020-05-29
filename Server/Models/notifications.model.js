
var mongoose = require('mongoose');
var scheme = require('./scheme');
var notificationSchema = scheme.notifications;



module.exports = mongoose.model('Notifications', notificationSchema);




