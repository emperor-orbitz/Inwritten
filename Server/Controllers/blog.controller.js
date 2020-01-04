


var userModel = require('../Models/user.model');
//var http_status = require("../Utils/http_status");
var posts = require('../Models/post.model');
var templ = require('../Models/template.model');
var comment_model = require('../Models/comments.model');





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
                                    select:"display_picture email username body_html"
                                }
                            })
                              .select("")
                              

        if (data != null) {
            console.log(req.user)
            var scripts = [{script:"/template-starter-02/js/auth.js"}];
            res.render(`${template_data.template_name}/index`,
             { data,  comment_data: data.comments, partials:{
                comments:`./partials/comment.partials`
             },
             scripts:scripts,
             user: req.user

        
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

        let data = await posts.findOne({ username: req.param.username });
        let found_template = await templ.findById(data.template_id)
        if (found_template != null) {
            res.render(`${found_template.template_name}/profile`, data)
        }
        else res.send("Could not load article successfully")

    }
    catch (error) {
        res.send("An error occured" + error)


    }




}





var blog = async (req, res, next) => {

    try {
        let userData = await userModel.findOne({ username: req.params.username })
            .populate("template_id");
        if (userData != null) {
            res.render(`${userData.template_id.template_name}/blog`)
        }
        else res.render("Operation was unsuccessful")

    }

    catch (error) {
        res.send("Ooops, there was an error")
        console.log(error)
    }


}




var bookmark = async (req, res, next) => {

    try {
        console.log(req.user._id)
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
                                  .populate("bookmarks", "_id title description createdAt")

        if(bookmarks == null) res.send({ bookmarks, message:"Successfully listed"})
        else  res.send({ bookmarks, message:"Empty bookmarks"})
        
    }

    catch (error) {
        res.send("Ooops, there was an error")
        console.log(error)
    }


}








//EXPORTS
module.exports = {
    index: index,
    user: user,
    blog: blog,
    bookmark: bookmark,
    remove_bookmark:remove_bookmark,
    list_bookmark: list_bookmark
};