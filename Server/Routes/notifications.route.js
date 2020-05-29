var express = require('express');
var controller = require("../Controllers/notifications.controller");
var router = express.Router();
var passport = require("passport");





/*         UPDATE PROFILE
        Update proile Details
*/


router.get('/notifications/get', (req, res, next) => {   
controller.get(req, res, next)

})



router.post('/notifications/create', (req, res, next) => {
controller.create(req, res, next);
});


router.delete('/notifications/delete', (req, res, next) => {
    controller.remove(req, res);
    });



module.exports = router;