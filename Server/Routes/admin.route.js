var express = require('express');
var controller = require("../Controllers/admin.controller");
var router = express.Router();
var passport = require("passport");


/*
*          AUTH ROUTES
*/

var isAuth = (req, res, next) => {
    passport.authenticate("jwt-admin", { session: false })
        (req, res, next);
}




router.get('/admin/login', (req, res, next) => {
    controller.login_page(req, res, next);

})


router.get('/admin/secret/one-way-road' /*Not now isAuth*/, (req, res, next) => {
    controller.secret_space(req, res, next);

})

router.post('/admin/login/submit', (req, res, next) => {
    controller.login_page_submit(req, res, next);

})

router.post('/admin/bulk_message/submit' /*Not now isAuth*/, (req, res, next) => {
    controller.secret_space(req, res, next);

})

router.post('/admin/send_bulk_email' /*Not now isAuth*/, (req, res, next) => {
    controller.send_bulk_email(req, res, next);

})


module.exports = router;