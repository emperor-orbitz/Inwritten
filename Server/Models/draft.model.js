
var mongoose = require('mongoose');
var scheme = require('./scheme');
var draftSchema = scheme.drafts;



/*
        LOAD LIMITED POSTS
*/

draftSchema.methods.loadUserDraft = (_id, limit, callback) => {

    return mongoose.model('Draft', draftSchema)
        .find({ authorId: _id }, {
        }, { limit: limit }, callback)
        .sort({createdAt:-1})
        .populate('comments')
        .select('-featured_image')
        
        
        ;
};




/*
          INSERT NEW POSTS
*/
draftSchema.methods.insertDraft = function (post, callback) {

    // mongoose.model("Draft", draftSchema).remove({public:false})
    return mongoose.model('Draft', draftSchema)
        .create({ ...post }, callback);
}



/*
          FIND ARTICLES BY _ID
*/
draftSchema.methods.find_draft = (post_id, callback_func) => {

    var objId = mongoose.Types.ObjectId(post_id);
    return mongoose.model('Draft', draftSchema)
    .findById(objId, callback_func)
    .populate('comments');
}



/*
        UPDATE AUTHOR
*/
draftSchema.methods.updateAuthor =  (new_author, authorId)=>{

    mongoose.model('Draft', draftSchema).find({ authorId: authorId }, (err, doc) => {
        if (err) return err;
        
        else if (doc.length == 0) 
                return true;

        else {
            return mongoose.model('Draft', draftSchema).updateMany({ authorId: authorId }, {
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
           LOAD ALL DRAFT (AUTHOR:USER )
*/
draftSchema.methods.loadAllDraft = (username, callback) => {
    //no limit
    return mongoose.model('Draft', draftSchema)
        .find({ author: username },
            callback)
        .sort({createdAt:-1})
        //.select("featured_image")
        .populate({
                   path:"comments",
                   populate:{ path:"commenter_id", 
                   select:"username email display_picture template_id"
                            }
    })
    

        
};





/*           DELETE A POST
*/
draftSchema.methods.delete_draft = (post_id, callback_func) => {
    return mongoose.model('Draft', draftSchema)
                   .deleteOne({ _id: post_id }, callback_func);

}




/*
  UPDATE ARTICLE
*/
draftSchema.methods.update_draft = (id, body,published, callback_func)  =>{
console.log(id, "id hrre shaaaa")
    var data = {
        // id:this.state.post_id,
        _id: id,
        title: body.title.trim(),
        //createdAt: body.createdAt,
        category: body.category,
        description:  body.description.trim() ,
        time_to_read: body.time_to_read,
        comments_enabled: body.comments_enabled,
        public: body.public,
        body_html: body.body_html,
        body_schema: body.body_schema,
        featured_image: body.featured_image || "",
        authorId: body.authorId,
        author: body.author,
        published:published

    }
    return mongoose.model('Draft', draftSchema)
                   .findOneAndUpdate({ _id:id }, data,{useFindAndModify:false, upsert:true, new:true /**reuturn new data alojng */}, callback_func);

}


module.exports = mongoose.model('Draft', draftSchema);




