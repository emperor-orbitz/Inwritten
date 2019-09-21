
var signup = require('../Models/user.model');
var posts = require('../Models/post.model');
var cloudinary = require('cloudinary');
var http_status = require("../Utils/http_status");






cloudinary.config({
    cloud_name: 'hashstackio',
    api_key: '811369211532916',
    api_secret: 'uK3gacxJoPCpL_dnEp3RFo2ClTU'
});
//REMEMBER TO USE .ENV






/*
*
*           LOAD ALL ARTICLES
*
*/

var loadAllList = (req, res, next) => {

    var post = new posts();

    post.loadAllPost(req.users.username, function (err, results) {
        if (err){
            res.send({
                message: http_status.INTERNAL_SERVER_ERROR.message,
                code:http_status.INTERNAL_SERVER_ERROR.code, 
                data:[]
            })
        } 
        
        else 
            res.send({ message: http_status.OK.message, code: http_status.OK.code, data: results });
        

    })


}

/*
*
*           LOAD FEW ARTICLES WITH LIMIT 
*
*/

var loadList = (req, res, next)=> {

    var limit = parseInt(req.query.limit);
    var post = new posts();

    post.loadUserPost(req.users.username, limit, (err, results) => {
        if (err) {
            res.send({
                message: http_status.INTERNAL_SERVER_ERROR.message,
                code:http_status.INTERNAL_SERVER_ERROR.code, 
                data:[]
            })
        }
           
        
        else 
            res.send({
                message: http_status.OK.message,
                code:http_status.OK.code, 
                data:results
            })
        

    })

}



/*
*
*           LOAD SINGLE ARTICLE
*
*/


var article = (req, res) => {

    var { post_id } = req.body;
    var post = new posts();

    post.find_article(post_id, function (err, doc) {
        if (err) {
            res.send({
                message: http_status.INTERNAL_SERVER_ERROR.message,
                code:http_status.INTERNAL_SERVER_ERROR.code, 
                data:[]
            })
        } 
        else 
            res.send({
                message: http_status.OK.message,
                code:http_status.OK.code, 
                data:doc
            });      
    })
}



/*
*
*           CREATE ARTICLE
*
*/





var create = (req, res)=> {
    let { title, body, category, 
          description, createdAt, comments_enabled,
         time_to_read, public, featured_image 
        } = req.body;
    //console.log(req);
    var postDoc = {
        title: title,
        body: body,
        createdAt: createdAt,
        author: req.users.username,
        category: category,
        description: description,
        time_to_read: time_to_read,
        comments_enabled: comments_enabled,
        public: public,
        authorId: req.users._id

    }
    if (featured_image != '') {
        cloudinary.v2.uploader.upload(featured_image, {
            resource_type: "image",
            public_id: `featured_image/${req.users._id}-${createdAt}`,
            overwrite: true
        },
            function (error, result) {
                if (error) {
                    res.send({ STATUS: 'false' });
                }

                else {
                    var post = new posts();
                    let final = Object.assign({}, postDoc, { featured_image: result.url });
                    post.insertPost(final, (err, success) => {
                        if (success) {
                            res.send({
                                MESSAGE: ERROR_MESSAGE.ARTICLE_ACTION_SUCCESS.MESSAGE,
                                CODE: ERROR_MESSAGE.ARTICLE_ACTION_SUCCESS.CODE,
                                RETURN: success._id
                            });
                        }

                        else {
                            console.log('I\'M A MESS')

                            res.send({
                                MESSAGE: ERROR_MESSAGE.ARTICLE_ACTION_FAILURE.MESSAGE,
                                CODE: ERROR_MESSAGE.ARTICLE_ACTION_FAILURE.CODE
                            });
                        }

                    })




                }
            }

        )



    }
    else {
        var post = new posts();
        //    let final= Object.assign( {}, postDoc, { featured_image:result.url });
        post.insertPost(postDoc, (err, success) => {
            if (success) {
                res.send({
                    message: http_status.OK.message,
                    code:http_status.OK.code, 
                    data:[]
                });
            }

            else 
                //console.log('I\'M A MESS')
                res.send({
                    message: http_status.INTERNAL_SERVER_ERROR.message,
                    code:http_status.INTERNAL_SERVER_ERROR.code, 
                    data:[]
                });
            

        })



    }



}


/*
*
*           DELETE ARTICLE WITH SPEDIAL _ID
*
*/

var deletePost = (req, res) => {
    let { id } = req.body;

    var postId = id;
    var post = new posts();

    post.delete_article(postId, (err, success) => {
        if (err) 
            res.send({
                message: http_status.INTERNAL_SERVER_ERROR.message,
                code:http_status.INTERNAL_SERVER_ERROR.code, 
                data:[]
            });
        

        else {
            res.send({
                MESSAGE: ERROR_MESSAGE.ARTICLE_ACTION_SUCCESS.MESSAGE,
                CODE: ERROR_MESSAGE.ARTICLE_ACTION_SUCCESS.CODE
            });

        }

    })

}

/**
 * UPDATE ARTICLE
 * 
 */

var update = (req, res) =>{


    var post = new posts();
    //console.log(req.body)
    post.update_article(req.body.id, req.body, (err, success) => {
        if (err) {
            res.send({
                message: http_status.INTERNAL_SERVER_ERROR.message,
                code:http_status.INTERNAL_SERVER_ERROR.code, 
                data:[]
            })
        }
            
        
        else 
         res.send({
            message: http_status.OK.message,
            code:http_status.OK.code, 
            data:[]
         });

        

    })


}


module.exports = {
    loadAllList: loadAllList,
    loadList: loadList,
    create: create,
    update: update,
    deletePost: deletePost,
    article: article
};