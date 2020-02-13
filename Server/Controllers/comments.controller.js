var comments = require('../Models/comments.model');
//var http_status = require("../Utils/http_status");
var posts =  require('../Models/post.model');
var axios =require("axios").default;






//*           LOAD ALL ARTICLES

var create = (req, res) => {

    var comment = new comments();
    //console.log(req.body, "rrrr")
   comment.create_comment(req.body,  (error, results)=>{
     if(error){
         console.log(error)
         res.status(400)
            .send({status:400, data:[]})
     }
     else{
        //push comment_id into post data
        posts.updateOne({_id: req.body.post_id }, {
            $push:{comments: results._id}
        }, (err,updated)=>{
            if(err){
                res.send({ message:`An error occured ${err}`, status:400 });

            }
            else if(req.body.commenter_id == req.body.author_id){
                // Don't send notif if its emitted by author
                res.send({message:req.originalUrl})
            }
            else{

                axios.post("http://localhost:5000/notifications/create", 
                   {
                        sender: req.body.commenter_id,
                        receiver: req.body.author_id,
                        type:'COMMENT',
                        message_id: results._id
                    }, { method:"POST"}
                )
                .then(data => res.send({message:req.originalUrl}) )
                .catch(err => res.send({ message:`An error occured ${err}`, status:400 }) )
                
            }
                

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
            .catch(err=> res.send({data:[], message:`Error occured ${err}`,
            status:500
        }))
  
  }

  var like =(req, res) =>{

    comments.updateOne({_id:req.body.id}, {$inc:{likes: 1}},
      (err, resolve)=>{
          if (err) 
              res.send({message:`An error Occured ${err}`})
          else
              res.send({data:resolve, status:200})
      }
      
      
      )
      
  }





  

//EXPORTS
module.exports = {
    create:create,
    update: update,
    list:list,
    delete: remove,
    like:like,
    
};