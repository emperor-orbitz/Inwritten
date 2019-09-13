


var express = require('express');
var router = express.Router();
var signup = require('../model/user');

var cloudinary = require('cloudinary');
var posts = require('../model/posts');


/*
*
*           CLOUDINARY CREDENTIALS
*
*/

cloudinary.config({
    cloud_name: 'hashstackio',
    api_key: '811369211532916',
    api_secret: 'uK3gacxJoPCpL_dnEp3RFo2ClTU'
});
//REMEMBER





/*
*
*           ISAUTH MIDDLEWARE
*
*/
function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        return res.send({ ERROR: 'YOU ARE NOT ALLOWED TO BE HERE' }).status(404);
    }
}


/*
*
*           UPDATE PROFILE
*/

router.post('/update_profile', isAuth, (req, res, next) => {
    console.log("hjgjhgjgjgjjg");
    var profile = new signup();
    var post = new posts();
    var update = req.body;


    //update.username = req.users.username;
    cloudinary.v2.uploader.upload(req.body.profile_photo, { public_id: req.users.username + '-profile' },
        function (error, result) {
            if (error) {
                res.send({ status: 'false', message: "something went wrong @clodinary upload! we'll fix it." });
            }

            else {

                update.profile_photo = result.url;
                profile.updateProfile(req.users._id, update, (err, success) => {
                    if (err) {
                        res.send({ status: 'false', message: "Something went @updateProfile wrong, we'll fix it" });
                    }

                    else {

                        var updateAuthor = post.updateAuthor(req.body.username, req.users._id);
                        if (updateAuthor == 'FALSE') {
                            res.send({ status: 'false', message: "something went wrong" });
                        }

                        else {
                            res.send({ status: 'success', message: "successful status update" });
                        }

                    }

                })


            }
        })

})

router.post("/update_password", isAuth, (req, res, next) => {


    console.log("ABCD EFGH");

    var body = { ...req.body };
    //var post= new posts();
    var users = new signup();

    users.findByEmail(req.users.email, function (err, succ) {

        if (err) {

            res.send({ status: 'false', message: "wrong password" });

        }
        else if (users.syncPass(body.old_password, succ[0].password)) {

            users.updateProfile_password(req.users._id, body, function (err, success) {
                if (err) {
                    res.send({ status: 'false', message: "smething went wrong!" });

                }
                else {

                    res.send({ status: 'success', message: "Password change successful" });

                }


            })





        }








    })





})



module.exports = router;