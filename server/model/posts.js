
var mongoose =require('mongoose');
var bcrypt =require('bcrypt');
var SALT_FACTOR =10;
var SCHEME =require('./scheme');

var postSchema = SCHEME.posts;
 


/*
*
*           LOAD LIMITED POSTS
*
*/


postSchema.methods.loadUserPost = function(username, limit, callback){

return mongoose.model('Post', postSchema)
.find({author:username},{
   // skip:0,
    }, {limit:limit} , callback);

};



/*
*
*           INSERT NEW POSTS
*
*/



postSchema.methods.insertPost = function(post, callback){

return mongoose.model('Post', postSchema)
.create({ ...post },
         callback);
}

/*
*
*           FIND ARTICLES BY _ID
*
*/



postSchema.methods.find_article = function(post_id, callback_func){

var objId =mongoose.Types.ObjectId(post_id);
return mongoose.model('Post', postSchema).findById(objId, callback_func ); 
}
 


/*
*
*         UPDATE AUTHOR
*
*/




postSchema.methods.updateAuthor = function(new_author, authorId){

mongoose.model('Post', postSchema).find({authorId: authorId}, function (err, doc){
if(err){
    return err;
}
else if(doc.length == 0){

    return 'TRUE';
}
else{
    return mongoose.model('Post', postSchema).updateMany({authorId: authorId}, {
        $set:{
            author: new_author
        }
    }, function(err, doc){
        if(err){
            return 'FALSE';

        } 
        else{
            return 'TRUE';
     
        }
    } ) 
}
    } )
  
}


/*
*
*           LOAD ALL POSTS (AUTHOR:USER )
*
*/


postSchema.methods.loadAllPost = function(username, callback){
//no limit
    return mongoose.model('Post', postSchema)
    .find({author:username}, callback);
    
};


/*
*
*           DELETE A POST
*
*/




postSchema.methods.delete_article = function(post_id, callback_func){
    var postId =post_id;

    return mongoose.model('Post', postSchema).deleteOne({_id: post_id}, callback_func );
    
    }
    
/**
 * 
 *   UPDATE ARTICLE
 * 
 */

 postSchema.methods.update_article = function( id, body, callback_func ){
 
    var data = {
       // id:this.state.post_id,
        title: body.title.trim(),
        createdAt: body.createdAt,
        category: body.post_category,
        description: body.description.trim(),
        time_to_read: body.time_to_read,
        comments_enabled: body.comments_enabled,
        public: body.public,
        body: body.body,
        featured_image:body.featured_image || ""
  
      }
    return mongoose.model('Post', postSchema).findByIdAndUpdate(  id , data, callback_func);

 }


module.exports= mongoose.model('Post', postSchema);




