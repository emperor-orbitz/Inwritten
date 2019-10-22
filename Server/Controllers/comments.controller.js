var comments = require('../Models/comments.model');
//var http_status = require("../Utils/http_status");
var posts =  require('../Models/post.model');







//*           LOAD ALL ARTICLES

var create = (req, res, next) => {

    var comment = new comments();

   comment.create_comment(req.body, async (error, results)=>{
     if(error){
         res.status(401)
            .send({status:401, data:[]})
     }
     else{
        //push comment_id into post data
        var article = new posts();
        var update_article = await article.updateOne({_id: req.body.post_id }, {
            $push:{comments: req.body.comment}
        })
        update_article.then( updated=>{
            res.send({data: updated, status:200})
        })   
        .catch(err => { res.send({message:`An error occured ${err}` })})  






     }

   })

}


var update = (req, res, next)=>{

    var comment = new comments();
    comment.create_comment(req.body, (error,results)=>{
        if(err){
            res.status(401)
               .send({status:401, data:[]})
        }
        else{
           res.send({
                       data: results, status:200
                   })
   
   
        }
   
      })







}




  


module.exports = {
    create:create,
    update: update
};