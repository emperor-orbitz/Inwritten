var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const SCHEME = {

    /*         BLOG POST SCHEMA
    */

    template: new Schema({

        template_name: { type: String, required: true, unique:true },
        template_description: { type:String, default:"No template description", maxlength: 255 },
        file_location: { required: true, type: String },
        featured_image: {type:String },
        showcase_url: {type:String},
        category:{type:String, default:'all'},
        profile_url: {type:String, required:true},
        blogs_url:{type:String, required:true},
        index:{type:String, required:true}


    },
        {
            timestamps: true,
            versionKey: false,
            strict: false
        }),


    /*
             USER PROFILE SCHEMA
    */


    profile: new Schema({
        username: { type: String, lowercase: true, trim: true, required: true, unique:true },
        address:{ type: String, trim:true, lowercase:true},
        email: { type: String, lowercase: true, required: true, trim: true, unique:true },
        password: { type: String, required: true },
        telephone: { type: Number },
        lastName: { type: String, trim: true },
        firstName: { type: String, trim: true },
        display_picture: { type: String, default: "/user-icon.png" },
        bio: { type: String },
        verified: { type: Boolean, required: true, default: false },
        lastVerified: { type: Date, default: Date.now() },
        profile_link:{type:String, default:"", lowercase:true},
        country:{type: mongoose.Schema.Types.Array, default:[]  },
        gender: {type:String, default:""},
        template_id: { type: mongoose.Schema.Types.ObjectId, default: "5e01d83ff47d3806c0aa6992",
        ref:"Template"
    },

    },
        {
            timestamps: true,
            versionKey: false,
            strict: false
        }),


    /*
               ARTICLES/POST SCHEMA
    */

    posts: new Schema({

        title: { type: String },
        body_html: { type: mongoose.Schema.Types.Mixed },
        body_schema:{ type: mongoose.Schema.Types.Mixed},
        featured_image: { type: String },
        category: { type: String, lowercase: true },
        createdAt: { type: Date },
        like_count: { type: Number },
        time_to_read: { type: Number },
        comments_enabled: { type: Boolean },
        public: { type: Boolean },
        author: String,
        description: { type: String },
        likes:{ Type: mongoose.Schema.Types.Number, default:0 },
        comments: [{type: mongoose.Schema.Types.ObjectId, ref:"Comment"}],
        post_link:{type:String, default:""},
        authorId: { type: mongoose.Schema.Types.ObjectId, ref:"User" },
        times_read:{ type:Number, default:0 },
        template_id: { type: mongoose.Schema.Types.ObjectId, default: "5e01d83ff47d3806c0aa6992" },

    },
        {
            timestamps: true,
            versionKey: false,
            strict: false
        }
    ),

    comments: new Schema({
        seen: {type:Boolean, default:false},
        author_id: { type: mongoose.Schema.Types.ObjectId,  ref:"User" },
        commenter_id: { type:mongoose.Schema.Types.ObjectId, ref:"User"},
        likes:{type:Number, default:0 },
        post_id: { type: mongoose.Schema.Types.ObjectId, required:true },
        public: { type: Boolean, default:false },
        comment: {type: String}
    },
        {
            timestamps: true,
            versionKey: false,
            strict: false
        }
    ),
    preferences: new Schema({
        background: {type:String, default:"white"},
       
    },
        {
            timestamps: true,
            versionKey: false,
            strict: false
        }
    )    

}



module.exports = SCHEME;