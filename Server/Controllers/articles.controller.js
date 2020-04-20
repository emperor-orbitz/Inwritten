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











//          LOAD FEATURED IMAGE

var loadImage = (req, res, next) => {

    var story_id = req.query.id ;
    posts.findById(story_id).select("featured_image")
    .then(doc =>{
        if(doc == null){
            console.log("empty image place", doc)
        }
        else{
            res.send({ data: doc.featured_image, type: "success" })
            console.log(doc)
        }
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
       // createdAt,
        comments_enabled,
        time_to_read,
        public,
        featured_image,
        tags
    } = req.body;

    var postDoc = {
        title,
        body_schema,
        body_html,
        //createdAt,
        author: req.user.username,
        category,
        description,
        time_to_read,
        comments_enabled,
        public,
        authorId: req.user._id,
        featured_image : featured_image != undefined ? featured_image: "link_to_image",
        tags,
        post_link: `/user/${req.user.username}---${title.replace(new RegExp(/\s/ig), "-")}---${Date.now()}`

    }


        cloudinary.v2.uploader.upload(featured_image, {
            resource_type: "image",
            public_id: `featured_image/${req.user._id}-${Date.now()}`,
            overwrite: true
        })
        .then(result =>{

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
                    res.send({ data: success,
                             status: http_status.OK.code
                      })       
                }

        })}
     )
            .catch(error =>{
                var post = new posts()

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
        
            })

    


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



  var interests =(req, res) =>{

    posts.find({category: req.query.topic, public:true},"-body_html -body_schema -comments",
      (err, resolve)=>{
          if (err) 
              res.send({message:`An error Occured ${err}`, status:500})
          else
              res.send({data:resolve, status:200})
      }
      
      
      )
      .populate("authorId", "email username featured_image")
      
      
  }


//DELETE AL THE ARTICLES
var delete_all = (req, res, next) => {

    var post = posts.deleteMany({ authorId: req.user._id, public: req.body.public })
                    .then( data =>{
                        res.send({ message:"successfully deleted all", data , status:200})
                    })
                    .catch( error =>{
                        res.send({ message:"successfully deleted all", status:500, error })

                    })
}




module.exports = {
    loadAllList: loadAllList,
    create: create,
    update: update,
    deletePost: deletePost,
    article: article,
    like:like,
    interests:interests,
    loadImage: loadImage,
    delete_all: delete_all
};