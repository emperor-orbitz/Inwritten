var express = require("express");
var controller = require("../Controllers/drafts.controller");
var router = express.Router();
var passport = require("passport");
var valid = require("../Utils/validation");

var isAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false })(req, res, next);
};

/*
         ARTICLE ACTIONS

*/

router.get("/drafts/loadlist", isAuth, (req, res, next) => {
  controller.loadList(req, res, next);
});

router.delete("/drafts/delete", isAuth, (req, res, next) => {
  controller.deleteDraft(req, res);
});

router.delete("/drafts/delete_all", isAuth, (req, res, next) => {
  controller.delete_all(req, res);
});

router.get("/drafts/loadAllList", isAuth, (req, res, next) => {
  controller.loadAllList(req, res, next);
});

router.patch("/drafts/update", isAuth, (req, res, next) => {
  controller.update(req, res, next);
});

router.post("/drafts/create", isAuth, (req, res, next) => {
  controller.create(req, res, next);
});

router.post("/drafts/draft", isAuth, (req, res, next) => {
  controller.draft(req, res);
});

router.get("/drafts/fetchimage", (req, res, next) => {
  controller.loadImage(req, res, next);
});

router.post("/drafts/save_image",isAuth, (req, res, next) => {
  controller.saveImage(req, res, next);
});

module.exports = router;
