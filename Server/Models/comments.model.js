
var mongoose = require('mongoose');
var scheme = require('./scheme');
var commentSchema = scheme.comments;


//BASIC CRUD FOR COMMENTS FIRST
//Create Comment

commentSchema.methods.create_comment = function (new_comment, callback_func) {

    return mongoose.model('Comment', commentSchema).create({...new_comment}, callback_func);

}
commentSchema.methods.update_comment = function (updates, callback_func) {
    let id = updates._id;
    delete updates._id;
    return mongoose.model('Comment', commentSchema).updateOne({_id: id },
        { $set: {...updates}},
        callback_func);

}






module.exports = mongoose.model('Comment', commentSchema);




