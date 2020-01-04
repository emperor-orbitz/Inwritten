var http_status = require("../Utils/http_status");
var signup = require('../Models/user.model');
var cloudinary = require('cloudinary');
var posts = require('../Models/post.model');


/*           CLOUDINARY CREDENTIALS
*/

cloudinary.config({
    cloud_name: 'hashstackio',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});




/*           UPDATE PROFILE
*/

var update_profile = (req, res, next) => {

    var profile = new signup();
    var post = new posts();
    var update = req.body;

    if(req.user.display_picture === req.body.profile_photo){
        console.log(true)
        profile.updateProfile(req.user._id, req.body, false, (err, success) => {
                    if (err) {
                        res.send({
                            code: http_status.BAD_REQUEST.code,
                            message: http_status.BAD_REQUEST.message,
                            data: []
                        })
                    }
                    else {

                        var updateAuthor = post.updateAuthor(req.body.username, req.user._id);
                        if (updateAuthor == false)
                            res.send({
                                code: http_status.INTERNAL_SERVER_ERROR.code,
                                message: http_status.INTERNAL_SERVER_ERROR.message,
                                data: []
                            });
                        
                           
                        else
                            res.send({
                                code: http_status.OK.code,
                                message: http_status.OK.message,
                                data: []
                            })


        }
    })
}

    else{

    cloudinary.v2.uploader.upload( 
        req.body.profile_photo, {
            resource_type: "image",
            folder:"profile",
            public_id: `${req.user._id}-${req.body.username}-${Date.now()}`,
            overwrite: true,
            transformation: [
                {width: 600, crop: "scale"},
                {quality: "auto"}
                ]
        },

        function (error, result) {
            if (error) {
                //Bad formats
                res.send({
                    code: http_status.BAD_REQUEST.code,
                    message: http_status.BAD_REQUEST.message,
                    data: []
                });
            }

            else {

                update.profile_photo = result.url;
                profile.updateProfile(req.user._id, update, (err, success) => {
                    if (err) {
                        res.send({
                            code: http_status.BAD_REQUEST.code,
                            message: http_status.BAD_REQUEST.message,
                            data: []
                        })
                    }
                    else {

                        var updateAuthor = post.updateAuthor(req.body.username, req.user._id);
                        if (updateAuthor == false)
                            res.send({
                                code: http_status.INTERNAL_SERVER_ERROR.code,
                                message: http_status.INTERNAL_SERVER_ERROR.message,
                                data: []
                            });
                        
                           
                        else
                            res.send({
                                code: http_status.OK.code,
                                message: http_status.OK.message,
                                data: []
                            })

                    }

                })


            }
        }).catch((err)=>{
           //SERVER ERROR
            console.log(err)
        })
    }
}





var update_password = (req, res, next) => {


    var body = { ...req.body };
    var users = new signup();

    users.findByEmail(req.user.email, (err, user)=> {

        if (err) 
        res.status(http_status.INTERNAL_SERVER_ERROR.code)
        .send({  code: http_status.INTERNAL_SERVER_ERROR.code,
                 message: http_status.INTERNAL_SERVER_ERROR.message });
        
        else if (users.syncPass(body.old_password, user.password)==true ) {

            users.updateProfile_password(req.user._id, body, function (err, success) {
                if (err) 
                res.status(http_status.INTERNAL_SERVER_ERROR.code)
                .send({  code: http_status.INTERNAL_SERVER_ERROR.code,
                         message: http_status.INTERNAL_SERVER_ERROR.message });
                
                else {
                    res.status(http_status.OK.code)
                    .send({ code: http_status.OK.code,
                            message: http_status.OK.message
                 });
                }


            })

        }
        else {
                res.status(http_status.INTERNAL_SERVER_ERROR.code)
                .send({  code: http_status.INTERNAL_SERVER_ERROR.code,
                         message: http_status.INTERNAL_SERVER_ERROR.message })


        }


    })





}



module.exports = {
    update_profile: update_profile,
    update_password: update_password,
};