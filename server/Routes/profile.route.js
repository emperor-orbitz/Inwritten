var express = require('express');
var controller = require("../Controllers/profile.controller");
var router = express.Router();
var http_status = require("../Utils/http_status");


//REMEMBER TO USE .ENV


function isAuth(req, res, next) {
    if (req.isAuthenticated()) next();
    
    else  return res.send({ ...http_status.UNAUTHORIZED, data:[] }).status(404);
    
}


/*         UPDATE PROFILE
        Update proile Details

*/



router.post('/profile/update_profile', isAuth, (req, res, next) => {   
controller.update_profile(req, res, next)

})

router.post('/profile/update_password', isAuth, (req, res, next) => {

controller.update_password(req, res);
});



module.exports = router;