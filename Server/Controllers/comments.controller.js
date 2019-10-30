var comments = require('../Models/comments.model');
//var http_status = require("../Utils/http_status");
var posts =  require('../Models/post.model');







//*           LOAD ALL ARTICLES

var create = (req, res) => {

    var comment = new comments();

   comment.create_comment(req.body, async (error, results)=>{
     if(error){
         res.status(400)
            .send({status:400, data:[]})
     }
     else{
        //push comment_id into post data
        posts.updateOne({_id: req.body.post_id }, {
            $push:{comments: results._id}
        }, (err,updated)=>{
            if(err)
               res.send({ message:`An error occured ${err}`, status:400 });
            else
                res.send({data: updated, status:200})

        })
       

     }

   })

}


var update = (req, res) =>{

    var comment = new comments();
    comment.update_comment(req.body, (error,results) => {
        if(error){
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

    

var list = (req, res, next) =>{

    comments.find({post_id: req.query.id})
          .then(result =>{ res.send({data: result, status:200 }) })
          .catch(err=> res.send({data:[], message:`Error occured ${err}`}))
  
}




var remove = (req, res, ) =>{
  comments.deleteOne({_id:req.body.id})
            .then(result =>{ res.send({data: result, status:200 }) })
            .catch(err=> res.send({data:[], message:`Error occured ${err}`}))
  
  }






  

//EXPORTS
module.exports = {
    create:create,
    update: update,
    list:list,
    delete: remove
};