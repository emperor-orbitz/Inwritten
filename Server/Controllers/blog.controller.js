var comments = require('../Models/comments.model');
//var http_status = require("../Utils/http_status");
var posts =  require('../Models/post.model');







//*           LOAD ALL ARTICLES

var display = (req, res) => {

    var link =  req.originalUrl

    posts.findOne({post_link:link}, (err, data)=>{
        if(err){
            res.send("Sorry there was an error"+err)
        }
        else
             res.render("template-default-01/index", { data })
             //console.log(data)

    })

    
    //res.send("i have seen this"+ title+author)



}


//load User Profile
var user = (req, res) =>{

   

    }

    

var list = (req, res, next) =>{

  
}




var remove = (req, res, ) =>{
  
  }



  var like =(req, res) =>{

      
  }





  

//EXPORTS
module.exports = {
    display:display,
    user: user,
    list:list,
    delete: remove,
    like:like
};