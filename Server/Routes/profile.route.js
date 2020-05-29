var express = require('express');
var controller = require("../Controllers/profile.controller");
var router = express.Router();
var passport = require("passport");


//REMEMBER TO USE .ENV


var isAuth = (req, res, next) => {
    passport.authenticate("jwt", { session: false })
        (req, res, next);

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



router.post('/profile/update_social', isAuth, (req, res, next) => {
    controller.update_social(req, res);
});


router.post('/profile/fetch_social', isAuth, (req, res, next) => {
    controller.fetch_social(req, res);
});

router.post('/profile/fetch_stats', isAuth, (req, res, next) => {
    controller.fetch_stats(req, res);
});
module.exports = router;