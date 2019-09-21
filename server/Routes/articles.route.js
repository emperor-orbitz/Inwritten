var express = require('express');
var controller = require("../Controllers/articles.controller");
var router = express.Router();
var http_status = require("../Utils/http_status").default;




function isAuth(req, res, next) {
    if (req.isAuthenticated()) next();
    
    else  return res.send({ ...http_status.UNAUTHORIZED, data:[] }).status(404);
    
}
/*
*
*          ARTICLE ACTIONS
*
*/

router.post('/articles/loadlist', isAuth, (req, res, next) => {   
controller.loadList(req, res, next);

});

router.post('/articles/delete', isAuth, (req, res, next) => {

controller.deletePost(req, res);
});

router.post('/articles/loadAllList', isAuth, (req, res, next) => {

controller.loadAllList(req, res, next);
});

router.post('/articles/update', isAuth, (req, res, next) => {
controller.update(req, res, next);

});

router.post('/articles/create', isAuth, (req, res, next) => {
controller.create(req, res, next);

});

router.post('/articles/article', isAuth, (req, res, next) => {

controller.article(req,res);
});


module.exports = router;