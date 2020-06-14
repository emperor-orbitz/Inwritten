var drafts = require('../Models/draft.model');
var cloudinary = require('cloudinary');
var http_status = require("../Utils/http_status");



cloudinary.config({
    cloud_name: 'hashstackio',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});






//*           LOAD ALL ARTICLES

var loadAllList = (req, res, next) => {

    var draft = new drafts();

    draft.loadAllDraft(req.user.username, function (err, results) {
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
    drafts.findById(story_id).select("featured_image")
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

var draft = (req, res) => {

    var { id } = req.body;
    var draft = new drafts();

    draft.find_draft( id, function (err, doc) {
        if (err) {
            res.status(http_status.INTERNAL_SERVER_ERROR.code)
                .send({ data: [] })
        }
        else
             res.status(200)
                .send({ data: doc })
    })


}



//*   CREATE DRAFT

var create = (req, res) => {

    if(req.body._id != undefined){
        console.log("UPDATING...", req.body._id)
        updateCurrentDraft(req, res)

    }
    else{
            console.log("NEW ONE", req.body._id, req.body.body_schema)

    let { title, body_html, body_schema, category, description, comments_enabled,
         time_to_read, public,featured_image, tags, authorId } = req.body;



    var postDoc = { 
        title, body_schema, body_html, author: req.user.username, category, description, time_to_read,
         comments_enabled, public, 
        authorId: req.user._id,
        featured_image : featured_image != undefined ? featured_image: "link_to_image", tags,
        post_link: `/user/@${req.user.username}/${title.replace(new RegExp(/\s/ig), "-")}---${Date.now()}`

    }


        cloudinary.v2.uploader.upload(featured_image, {
            resource_type: "image",
            public_id: `featured_image/${req.user._id}-${Date.now()}`,
            overwrite: true
        })
        .then(result =>{

            var draft = new drafts();
            let final = Object.assign({}, postDoc, { featured_image: result.url });
            draft.insertDraft(final, (err, success) => {
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

                //AS A RESULT OF INVALIDURL
                var draft = new drafts()

                draft.insertDraft(postDoc, (err, success) => {
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

}







//*   DELETE DRAFT WITH SPECIAL _ID

var deleteDraft = (req, res) => {
    let { id } = req.body;

    var draft = new drafts();

    draft.delete_draft(id, (err, success) => {
        if (err)
            res.status(http_status.INTERNAL_SERVER_ERROR.code)
               .send({ status:500, data: [] });


        else {
            console.log(success, "OK DELETED")
            res.status(http_status.OK.code)
               .send({ status:200, data: success})

        }

    })

}


//*  UPDATE DRAFT

var updateCurrentDraft = (req, res) => {
    var draft = new drafts();
    let body = Object.assign({}, req.body, {authorId: req.user._id, author:req.user.username})
    console.log("i got here", req.body._id)
    draft.update_draft(req.body._id, body, false, (err, success) => {
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





//DELETE AL THE DRAFTS
var delete_all = (req, res, next) => {

    var post = posts.deleteMany({ authorId: req.user._id, public: req.body.public })
                    .then( data =>{
                        res.send({ message:"successfully deleted all", data , status:200})
                    })
                    .catch( error =>{
                        res.send({ message:"successfully deleted all", status:500, error })

                    })
}


var update = (req, res) =>{

    var draft = new drafts();
    let body = Object.assign({}, req.body, {authorId: req.user._id, author:req.user.username})
    console.log("i got here too na", req.body._id)
    draft.update_draft(req.body._id, body, false, (err, success) => {
        if (err) {
            res.status(http_status.INTERNAL_SERVER_ERROR.code)
               .send({ status:500, data: [] })
               console.log(err+"errr")
        }

        else
        console.log(success, "this is dataaa aa oo")
            res.status(http_status.OK.code)
               .send({ status:200, data: success });

    })
}


module.exports = {
    loadAllList: loadAllList,
    create: create,
    updateCurrentDraft: updateCurrentDraft,
    deleteDraft: deleteDraft,
    draft: draft,
    loadImage: loadImage,
    delete_all: delete_all,
    update:update
};