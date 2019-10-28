var posts = require('../Models/post.model');
var cloudinary = require('cloudinary');
var http_status = require("../Utils/http_status");



cloudinary.config({
    cloud_name: 'hashstackio',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});






//*           LOAD ALL ARTICLES

var loadAllList = (req, res, next) => {

    var post = new posts();

    post.loadAllPost(req.user.username, function (err, results) {
        if (err) {
            res.status(http_status.INTERNAL_SERVER_ERROR.code)
                .send({ data: [] })
        }

        else
            res.status(http_status.OK.code)
                .send({ data: results });


    })


}





//          LOAD FEW ARTICLES WITH LIMIT e.g. ?limit=2

var loadList = (req, res, next) => {

    var limit = parseInt(req.query.limit);
    var post = new posts();

    post.loadUserPost(req.user._id, limit, (err, results) => {
            if (err) {
                res.status(http_status.INTERNAL_SERVER_ERROR.code)
                    .send({ data: [] })
            }


            else
                res.status(http_status.OK.code)
                    .send({ data: results })


        })
}



//*           LOAD SINGLE ARTICLE

var article = (req, res) => {

    var { id } = req.body;
    var post = new posts();

    post.find_article( id, function (err, doc) {
        if (err) {
            res.status(http_status.INTERNAL_SERVER_ERROR.code)
                .send({ data: [] })
        }
        else
             res.status(200)
                .send({ data: doc })
    })


}



//*   CREATE ARTICLE

var create = (req, res) => {
    let { title,
        body_html,
        body_schema,
        category,
        description,
        createdAt,
        comments_enabled,
        time_to_read,
        public,
        featured_image 
    } = req.body;
featured_image=undefined;


    var postDoc = {
        title: title,
        body_schema: body_schema,
        body_html:body_html,
        createdAt: createdAt,
        author: req.user.username,
        category: category,
        description: description,
        time_to_read: time_to_read,
        comments_enabled: comments_enabled,
        public: public,
        authorId: req.user._id

    }


    if (featured_image != undefined) {

        cloudinary.v2.uploader.upload(featured_image, {
            resource_type: "image",
            public_id: `featured_image/${req.user._id}-${createdAt}`,
            overwrite: true
        },
       (err, result) => {

              if(err){

                res.status(http_status.INTERNAL_SERVER_ERROR.code)
                   .send({ data: [],
                         status: http_status.INTERNAL_SERVER_ERROR.code 
                      })
                    
                    }
                  else{ 
                    var post = new posts();
                    let final = Object.assign({}, postDoc, { featured_image: result.url });
                    post.insertPost(final, (err, success) => {
                        if (err) {

                            res.status(http_status.INTERNAL_SERVER_ERROR.code)
                               .send({ data: [],
                                        status: http_status.INTERNAL_SERVER_ERROR.code 
                                     })
                
                        }

                        else {
                            res.send({ data: success._id,
                                status: http_status.OK.code
                              })       
                        }

                    })

                }

            })


    }


    else {
        var post = new posts();

        post.insertPost(postDoc, (err, success) => {
            if (success) {
                res.status(200)
                    .send({
                          status:200,
                          data:success 
                          })
            }
            else{
                res.status(http_status.INTERNAL_SERVER_ERROR.code)
                .send({ 
                    status:500,
                    data: [] });
            }
                


        })

    }

}







//*   DELETE ARTICLE WITH SPECIAL _ID

var deletePost = (req, res) => {
    let { id } = req.body;

    var post = new posts();

    post.delete_article(id, (err, success) => {
        if (err)
            res.status(http_status.INTERNAL_SERVER_ERROR.code)
               .send({ status:500, data: [] });


        else {
            res.status(http_status.OK.code)
               .send({ status:200, data: success})

        }

    })

}


//*  UPDATE ARTICLE

var update = (req, res) => {
    var post = new posts();
    post.update_article(req.body._id, req.body, (err, success) => {
        if (err) {
            res.status(http_status.INTERNAL_SERVER_ERROR.code)
               .send({ status:500, data: [] })
               console.log(err+"errr")
        }

        else
            res.status(http_status.OK.code)
               .send({ status:200, data: success });

    })

}

var like =(req, res) =>{

    posts.updateOne({_id:req.body.id}, {$inc:{likes: req.body.like}},
      (err, resolve)=>{
          if (err) 
              res.send({message:`An error Occured ${err}`})
          else
              res.send({data:resolve, status:200})
      }
      
      
      )
      
  }





module.exports = {
    loadAllList: loadAllList,
    loadList: loadList,
    create: create,
    update: update,
    deletePost: deletePost,
    article: article,
    like:like
};