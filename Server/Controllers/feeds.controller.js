var posts = require('../Models/post.model');
var cloudinary = require('cloudinary');
var http_status = require("../Utils/http_status");
var feeds = require("../Models/follow.model");
const { Modifier } = require('draft-js');


cloudinary.config({
    cloud_name: 'hashstackio',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});






//*           LOAD ALL ARTICLES AND DRAFTS

var updateFeeds = async (data, followee_id)=>{

   await feeds.find({followee_id: followee_id})
         .updateMany({$push:{
             feeds: data
         }})
         
}




module.exports = {
    updateFeeds: updateFeeds
};