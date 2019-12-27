


var userModel = require('../Models/user.model');
//var http_status = require("../Utils/http_status");
var posts = require('../Models/post.model');
var templ = require('../Models/template.model');





//*           LOAD ALL ARTICLES

var index = async (req, res) => {

    let { originalUrl } = req;
    var link = req.params.link
    let username = link.split('---')[0];
    console.log(originalUrl)
    try {
        var user_data = await userModel.findOne({ username: username });

        let template_data = await templ.findById(user_data.template_id)

        let data = await posts.findOne({ post_link: originalUrl, public: true })
        if (data != null) {
            res.render(`${template_data.template_name}/index`, { data })
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










//EXPORTS
module.exports = {
    index: index,
    user: user,
    blog: blog
};