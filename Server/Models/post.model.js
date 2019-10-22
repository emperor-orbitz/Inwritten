
var mongoose = require('mongoose');
var scheme = require('./scheme');
var postSchema = scheme.posts;



/*
        LOAD LIMITED POSTS
*/
postSchema.methods.loadUserPost = (_id, limit, callback) => {

    return mongoose.model('Post', postSchema)
        .find({ authorId: _id }, {
        }, { limit: limit }, callback)
        .populate('comments');
};




/*
          INSERT NEW POSTS
*/
postSchema.methods.insertPost = function (post, callback) {

    return mongoose.model('Post', postSchema)
        .create({ ...post }, callback);
}



/*
          FIND ARTICLES BY _ID
*/
postSchema.methods.find_article = (post_id, callback_func) => {

    var objId = mongoose.Types.ObjectId(post_id);
    return mongoose.model('Post', postSchema)
    .findById(objId, callback_func)
    .populate('comments');
}



/*
        UPDATE AUTHOR
*/
postSchema.methods.updateAuthor =  (new_author, authorId)=>{

    mongoose.model('Post', postSchema).find({ authorId: authorId }, (err, doc) => {
        if (err) return err;
        
        else if (doc.length == 0) 
                return true;

        else {
            return mongoose.model('Post', postSchema).updateMany({ authorId: authorId }, {
                $set: {
                    author: new_author
                }
            }, (err, doc)=> {
                if (err) 
                    return false;

                else 
                    return true;

                
            })
        }
    })

}


/*
           LOAD ALL POSTS (AUTHOR:USER )
*/
postSchema.methods.loadAllPost = (username, callback) => {
    //no limit
    return mongoose.model('Post', postSchema)
        .find({ author: username }, callback)
        .populate('comments');

};





/*           DELETE A POST
*/
postSchema.methods.delete_article = (post_id, callback_func) => {

    return mongoose.model('Post', postSchema)
                   .deleteOne({ _id: post_id }, callback_func);

}




/*
  UPDATE ARTICLE
*/
postSchema.methods.update_article = (id, body, callback_func)  =>{

    var data = {
        // id:this.state.post_id,
        title: body.title.trim(),
        createdAt: body.createdAt,
        category: body.category,
        description: body.description.trim(),
        time_to_read: body.time_to_read,
        comments_enabled: body.comments_enabled,
        public: body.public,
        body_html: body.body_html,
        body_schema: body.body_schema,
        featured_image: body.featured_image || ""

    }
    return mongoose.model('Post', postSchema)
                   .findOneAndUpdate({_id:id}, data,{useFindAndModify:false}, callback_func);

}


module.exports = mongoose.model('Post', postSchema);




