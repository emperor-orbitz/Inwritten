var mongoose = require('mongoose');
var Schema =require('./scheme');
var blogSchema =Schema.blog_post;



blogSchema.method.get_post = function(username, title){

    //
}




module.exports= mongoose.model('blog_post',blogSchema);
