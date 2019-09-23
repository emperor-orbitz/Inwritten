var http_status = require("../Utils/http_status");
var signup = require('../Models/user.model');
var cloudinary = require('cloudinary');
var posts = require('../Models/post.model');


/*           CLOUDINARY CREDENTIALS
*/

cloudinary.config({
    cloud_name: 'hashstackio',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_KEY
});




/*           UPDATE PROFILE
*/

var update_profile = (req, res, next) => {

    var profile = new signup();
    var post = new posts();
    var update = req.body;


    cloudinary.v2.uploader.upload(req.body.profile_photo, { public_id: req.users.username + '-profile' },
        function (error, result) {
            if (error) {
                res.send({
                    code: http_status.INTERNAL_SERVER_ERROR.code,
                    message: http_status.INTERNAL_SERVER_ERROR.message,
                    data: []
                });
            }

            else {

                update.profile_photo = result.url;
                profile.updateProfile(req.users._id, update, (err, success) => {
                    if (err) {
                        res.send({
                            code: http_status.INTERNAL_SERVER_ERROR.code,
                            message: http_status.INTERNAL_SERVER_ERROR.message,
                            data: []
                        })
                    }
                    else {

                        var updateAuthor = post.updateAuthor(req.body.username, req.users._id);
                        if (updateAuthor == false)
                            res.send({
                                code: http_status.INTERNAL_SERVER_ERROR.code,
                                message: http_status.INTERNAL_SERVER_ERROR.message,
                                data: []
                            })
                        else
                            res.send({
                                code: http_status.OK.code,
                                message: http_status.OK.message,
                                data: []
                            })

                    }

                })


            }
        })

}





var update_password = (req, res, next) => {


    var body = { ...req.body };
    var users = new signup();

    users.findByEmail(req.user.email, (err, succ)=> {

        if (err) 
        res.status(http_status.INTERNAL_SERVER_ERROR.code)
        .send({ data: [] });
        
        else if (users.syncPass(body.old_password, succ[0].password)) {

            users.updateProfile_password(req.users._id, body, function (err, success) {
                if (err) 
                res.status(http_status.INTERNAL_SERVER_ERROR.code)
                .send({ data: [] });
                
                else {
                    res.status(http_status.INTERNAL_SERVER_ERROR.code)
                    .send({ data: [] });
                }


            })

        }

    })





}



module.exports = {
    update_profile: update_profile,
    update_password: update_password,
};