var http_status = require("../Utils/http_status");
var signup = require('../Models/user.model');
var cloudinary = require('cloudinary');
var posts = require('../Models/post.model');
var socialSchema = require('../Models/socials.model');


var followSchema = require("../Models/follow.model")

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

        // console.log(true)
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
                {width: 300, crop: "scale"},
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
                })
            }

            else {

                update.profile_photo = result.url;
                profile.updateProfile(req.user._id, update,true, (err, success) => {

                    if (err) {

                        res.send({
                            code: http_status.BAD_REQUEST.code,
                            message: http_status.BAD_REQUEST.message,
                            data: []
                        })
                    }
                    else {

                        var updateAuthor = post.updateAuthor(req.body.username, req.user._id);
                        if (updateAuthor == false){

                            res.send({
                                code: http_status.INTERNAL_SERVER_ERROR.code,
                                message: http_status.INTERNAL_SERVER_ERROR.message,
                                data: []
                            })
                        
                        }
                           
                           
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



//update social media links
var update_social = (req, res) =>{
    //upsert: Create if not available
    socialSchema.updateOne({ user_id: req.user._id }, {
        $set:{...req.body}
    }, { upsert:true })
    .then(onfulfilled =>{
        res.status(http_status.OK.code)
        .send({ code: http_status.OK.code,
                message: http_status.OK.message
     })
        })
    .catch(onrejected =>{
        res.status(http_status.INTERNAL_SERVER_ERROR.code)
        .send({  code: http_status.INTERNAL_SERVER_ERROR.code,
                 message: http_status.INTERNAL_SERVER_ERROR.message })
})

}



//fetch social media links
var fetch_social = (req, res) =>{

    socialSchema.findOne({ user_id: req.user._id })
    .then(data =>{
        res.status(http_status.OK.code)
        .send({ code: http_status.OK.code,
                data: data
     })
        })
    .catch(onrejected =>{
        res.status(http_status.INTERNAL_SERVER_ERROR.code)
        .send({  code: http_status.INTERNAL_SERVER_ERROR.code,
                 message: http_status.INTERNAL_SERVER_ERROR.message })
})

}


//fetch preview dashboard stats
var fetch_stats = async (req, res) =>{
//fetch total count of stories,bookmarks and followers
try{
    let story_count = await posts.find({authorId: req.user._id}).countDocuments()
   
    let follower_count = await followSchema.find({followee_id: req.user._id}).countDocuments()
    
    res.status(http_status.OK.code)
    .send({ code: http_status.OK.code,
            story_count, follower_count })

}
catch(error){
        //server error

        res.status(http_status.INTERNAL_SERVER_ERROR.code)
        .send({  code: http_status.INTERNAL_SERVER_ERROR.code,
                 message: http_status.INTERNAL_SERVER_ERROR.message })
}

    

}

module.exports = {
    update_profile: update_profile,
    update_password: update_password,
    update_social: update_social,
    fetch_social:fetch_social,
    fetch_stats: fetch_stats

};