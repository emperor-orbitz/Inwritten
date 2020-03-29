


var userModel = require('../Models/user.model');
//var http_status = require("../Utils/http_status");
var posts = require('../Models/post.model');
var templ = require('../Models/template.model');
var comment_model = require('../Models/comments.model');
var follow_model = require('../Models/follow.model');
var social_model = require("../Models/socials.model")




//*           LOAD ALL ARTICLES

var index = async (req, res) => {

    let { originalUrl } = req;
    var link = req.params.link
    let username = link.split('---')[0];
    

    try {
        var user_data = await userModel.findOne({ username: username });
        let template_data = await templ.findById(user_data.template_id)

        let data = await posts.findOne({ post_link: originalUrl, public: true })
                              .populate({path:"comments",
                                populate:{
                                    path:"commenter_id",
                                    select:"display_picture email username"
                                }
                            })
                            .populate("authorId", "username email display_picture bio")
                             // .select("")
                              

        if (data != null) {
            var scripts = [{script:`${template_data.template_name}/js/auth.js`}];

            console.log(data.tags.length)
            res.render(`${template_data.template_name}/index`,
             { data,  comment_data: data.comments, author_data: data.authorId ,tag_data:data.tags.split(","),
             partials:{
                comments:`./partials/comment.partials`,
                author:`./partials/author.partials`,
                interests:`./partials/interests.partials`

             },
             scripts:scripts,
             

        
        })
        }

        else
            res.send("Could not load article successfully")

    } catch (error) {
        res.send("An error occured" + error)

    }

}








//load User Profile
var user = async (req, res) => {

    try {

        let data = await userModel.findOne({ username: req.params.username });
        let found_template = await templ.findOne({ _id:data.template_id })
        let socials = await social_model.findOne({user_id: data._id}) || {}

        if (found_template != null) {

            res.render(`${found_template.template_name}/profile`, {user_data: data, social_data: socials})
        }
        else res.send("Could not load article successfully")

    }
    catch (error) {
        res.send("An error occured" + error)


    }




}





var blog = async (req, res, next) => {

    try {
        let data = await posts.find({ author: req.params.username, public: true })
        let user_data = await userModel.findOne({ username:req.params.username })
                                        .populate('template_id')

        if (data != null) {
            res.render(`${user_data.template_id.template_name}/blog`, { data, user_data })
        }
        else res.send("Seems there is no story yet")

    }

    catch (error) {
        res.send("Ooops, there was an error")
        console.log(error)
    }


}




var bookmark = async (req, res, next) => {

    try {

        let user = await userModel.update({_id: req.params.user_id},{
            $addToSet:{ //for uniqueness instead of $push
                bookmarks: req.params.blog_id
            }
        })
        if(user.nModified == 1){
            res.send({ user, message:"Successfully Added"})
        }
        else res.send({ user, message:"Not successfully added"})
    }

    catch (error) {
        res.send("Ooops, there was an error")
        console.log(error)
    }


}




var remove_bookmark = async (req, res, next) => {

    try {
        let user = await userModel.updateOne( { _id: req.user._id }, {
            $pull: {"bookmarks": req.params.bookmark_id}
        })
        if(user.nModified == 1) res.send({ user, message:"Successfully removed"})
        else  res.send({ user, message:"Not successfully removed"})
        
    }

    catch (error) {
        res.send("Ooops, there was an error")
        console.log(error)
    }


}




var list_bookmark = async (req, res, next) => {

    try {
        let bookmarks = await userModel.findOne( { _id: req.user._id },"bookmarks")
                                  .populate("bookmarks", "_id title author post_link description createdAt")

        if(bookmarks !== null) res.send({ bookmarks, message:"Successfully listed", status:200})
        else  res.send({ bookmarks, message:"Empty bookmarks", status:200})
        
    }

    catch (error) {
        res.send({message:"Ooops, there was an error", status:500})
            .status(500)

        console.log(error)
    }


}



var follow_status = async (req, res, next) => {


    try {
    var count = await follow_model.find({ follower_id: req.user._id, followee_id: req.query.followee }).countDocuments()

    if(count == 1 ){
        
            res.send({message:"Already following", status:200})
            .status(200)
    } 
    else {
        res.send({message:"Not following", status:200})
        .status(200)
    } 
     
    }

    catch (error) {
        res.send({message:"Ooops, there was an error", status:500})
            .status(500)

        console.log(error, "errooor")
    }


}




var follow_user = async (req, res, next) => {

    if (req.user._id == req.body.followee){
        return res.send({message:"You cant follow yourself", status:200})
        
    }

    try {
   
        let count = await follow_model.findOne({ follower_id: req.user._id, followee_id: req.body.followee }).countDocuments()
   
        if(count == 0){
            follow_model.create({ follower_id: req.user._id, followee_id: req.body.followee })
            .then(data =>{
                res.send({message:"User followed successfully", status:200})
                .status(200)
    
            })
        } 
        else {
            res.send({message:"User followed already", status:200})
            .status(200)
        }
        
     
     
    }

    catch (error) {
        res.send({message:"Ooops, there was an error", status:500})
            .status(500)

        console.log(error, "errooor")
    }


}


var other_interests = async (req, res, next) => {

    var count = await posts.find({ category:req.query.category  }).countDocuments()
    if( count > 1 ){
    let rand = Math.floor( Math.random() * count ) 
    var data = await posts.find({ category:req.query.category })
                        .skip(rand)
                        .limit(3)


    res.send({ message:data })
                    
}
    else {
        res.send({ message:"Database is empty" })
    }

}



var stories = async (req, res, next) => {

  res.json({data:'from blog'})

}






//EXPORTS
module.exports = {
    index: index,
    user: user,
    blog: blog,
    bookmark: bookmark,
    remove_bookmark:remove_bookmark,
    list_bookmark: list_bookmark,
    follow_user: follow_user,
    follow_status: follow_status,
    other_interests: other_interests,
    stories: stories
};