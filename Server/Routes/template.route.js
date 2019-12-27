var express = require('express');
var controller = require("../Controllers/template.controller");
var router = express.Router();
var passport = require("passport");

var isAuth = (req, res, next)=> {
    passport.authenticate("jwt", {session:false})
    (req, res, next);

}




/*
         TEMPLATE ACTIONS

*/


router.post('/template/new', (req, res, next) => {
    controller.insert(req, res, next);

})

router.get('/template/template_sample/:template_id', (req, res, next) => {
    controller.template_sample(req, res, next);

})

router.get('/template/get', (req, res, next) => {
    controller.templates(req, res, next);

})

router.get('/template/get', (req, res, next) => {
    //get /?category=category
    controller.templates_by_category(req, res, next);

})


router.patch('/template/add/:template_id', isAuth, (req, res, next) => {
    
    controller.add_template_to_profile(req, res, next);

})

router.get('/template/my_template/:template_id', isAuth, (req, res, next) => {
    
    controller.my_template(req, res, next);

})


module.exports = router;