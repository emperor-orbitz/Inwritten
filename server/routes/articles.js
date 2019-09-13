var express = require('express');

var signup = require('../model/user');
var passport = require('passport');
var router = express.Router();
var posts = require('../model/posts');
var cloudinary = require('cloudinary');


const ERROR_MESSAGE ={
LOGIN: { MESSAGE:'AUTHENTICATION FAILED', CODE:101},
ARTICLE_LOAD_FAILURE: { MESSAGE:'UNABLE TO FETCH ARTICLES', CODE:102 },
ARTICLE_LOAD_SUCCESS: { MESSAGE:'SUCCESSFUL', CODE:106 },
__404:{MESSAGE:'SORRY, WRONG URL. PLEASE CHECK AGAIN!', CODE:404 },
ARTICLE_ACTION_SUCCESS :{ MESSAGE:'OK', CODE:103 },
ARTICLE_ACTION_FAILURE :{ MESSAGE:'ERROR', CODE:104 }

}


cloudinary.config({
    cloud_name: 'hashstackio',
    api_key: '811369211532916',
    api_secret: 'uK3gacxJoPCpL_dnEp3RFo2ClTU'
});
//REMEMBER TO USE .ENV


function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        return res.send({ MESSAGE: ERROR_MESSAGE.LOGIN, CODE:ERROR_MESSAGE.LOGIN.CODE }).status(404);
    }
}
/*
*
*          ARTICLE ACTIONS
*
*/

router.post('/articles/:options', isAuth, (req, res, next) => {

    var options = req.params.options;
    var limit = req.query.limit;

    switch (options) {

        case 'loadlist':
            return loadList(req, res);
            break;
        case 'delete':
            return deletePost(req, res);
            

        case 'loadAllList':
            return loadAllList(req, res);
       

        case 'update':
            return update(req, res);
          

        case 'create':
            return create(req, res);
         

        case 'article':
            return article(req, res);
          
        
        default:
            res.send({MESSAGE:ERROR_MESSAGE.__404.MESSAGE}).status(404);


    }



})


/*
*
*           LOAD ALL ARTICLES
*
*/

function loadAllList(req, res) {

    var post = new posts();

    post.loadAllPost(req.users.username, function (err, results) {
        if (err) {
            res.send({ MESSAGE: ERROR_MESSAGE.ARTICLE_LOAD_FAILURE.MESSAGE, 
                CODE: ERROR_MESSAGE.ARTICLE_LOAD_FAILURE.CODE }) ;
        }
        else {
            res.send({ RESULT: results, CODE: ERROR_MESSAGE.ARTICLE_LOAD_SUCCESS.CODE }) ;
        }

    })


}

/*
*
*           LOAD FEW ARTICLES WITH LIMIT 
*
*/

function loadList(req, res, limit) {

    var limit = parseInt(req.query.limit);
    var post = new posts();

    post.loadUserPost(req.users.username, limit, function (err, results) {
        if (err) {
            res.send({MESSAGE: ERROR_MESSAGE.ARTICLE_LOAD_FAILURE.MESSAGE, 
                CODE: ERROR_MESSAGE.ARTICLE_LOAD_FAILURE.CODE });
        }
        else {
            res.send(results);
        }

    })

}



/*
*
*           LOAD SINGLE ARTICLE
*
*/


function article(req, res) {

    var { post_id } = req.body;

    var post = new posts();



    post.find_article(post_id, function (err, doc) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(doc);
        }
    })
}



/*
*
*           CREATE ARTICLE
*
*/





function create(req, res) {
    let { title, body, category, description, createdAt, comments_enabled, time_to_read, public, featured_image } = req.body;
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
        authorId:req.users._id
       
    }
if( featured_image != '' ){
    cloudinary.v2.uploader.upload(featured_image, {resource_type: "image", 
    public_id: `featured_image/${req.users._id}-${createdAt}`,
    overwrite: true},
    function (error, result) {
        if (error) {
            res.send({ STATUS: 'false' });
        }

        else {
            var post = new posts();
            let final= Object.assign( {}, postDoc, { featured_image:result.url });
            post.insertPost(final, (err, success) => {
                if (success) {
                    res.send( { MESSAGE:ERROR_MESSAGE.ARTICLE_ACTION_SUCCESS.MESSAGE ,
                         CODE: ERROR_MESSAGE.ARTICLE_ACTION_SUCCESS.CODE,
                         RETURN: success._id
                        });
                }
        
                else {
                    console.log('I\'M A MESS')

                    res.send( { MESSAGE:ERROR_MESSAGE.ARTICLE_ACTION_FAILURE.MESSAGE ,
                        CODE: ERROR_MESSAGE.ARTICLE_ACTION_FAILURE.CODE });
                }
        
            })

        


        }
    }

    )



}
  else{
    var post = new posts();
//    let final= Object.assign( {}, postDoc, { featured_image:result.url });
    post.insertPost(postDoc, (err, success) => {
        if (success) {
            res.send( { MESSAGE:ERROR_MESSAGE.ARTICLE_ACTION_SUCCESS.MESSAGE ,
                 CODE: ERROR_MESSAGE.ARTICLE_ACTION_SUCCESS.CODE,
                 RETURN: success._id
                });
        }

        else {
            console.log('I\'M A MESS')

            res.send( { MESSAGE:ERROR_MESSAGE.ARTICLE_ACTION_FAILURE.MESSAGE ,
                CODE: ERROR_MESSAGE.ARTICLE_ACTION_FAILURE.CODE });
        }

    })



  }

  

}


/*
*
*           DELETE ARTICLE WITH SPEDIAL _ID
*
*/

function deletePost(req, res) {
    let { id } = req.body;

    var postId = id;
    var post = new posts();

    post.delete_article( postId, (err, success) => {
        if (err) {
            res.send( { MESSAGE:ERROR_MESSAGE.ARTICLE_ACTION_FAILURE.MESSAGE ,
                CODE: ERROR_MESSAGE.ARTICLE_ACTION_FAILURE.CODE });
        }

        else {
            res.send( { MESSAGE:ERROR_MESSAGE.ARTICLE_ACTION_SUCCESS.MESSAGE ,
                CODE: ERROR_MESSAGE.ARTICLE_ACTION_SUCCESS.CODE });

        }

    })

}   

 /**
  * UPDATE ARTICLE
  * 
  */

  function update(req, res){
     
  
    var post = new posts();
    //console.log(req.body)
    post.update_article(req.body.id, req.body, (err, success)=>{
        if (err) {
            res.send( { MESSAGE:ERROR_MESSAGE.ARTICLE_ACTION_FAILURE.MESSAGE ,
                CODE: ERROR_MESSAGE.ARTICLE_ACTION_FAILURE.CODE });
        }
        else {
            res.send( { MESSAGE:ERROR_MESSAGE.ARTICLE_ACTION_SUCCESS.MESSAGE ,
                CODE: ERROR_MESSAGE.ARTICLE_ACTION_SUCCESS.CODE });

        }

    } )


  }


module.exports = router;