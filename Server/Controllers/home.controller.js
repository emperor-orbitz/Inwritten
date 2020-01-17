//var http_status = require("../Utils/http_status");
var posts =  require('../Models/post.model');







//*           LOAD ALL ARTICLES

var index = (req, res) => {

    res.render("index")
}







  

//EXPORTS
module.exports = {
    index:index
};