var posts = require("../Models/post.model");
var cloudinary = require("cloudinary");
var http_status = require("../Utils/http_status");
var drafts = require("../Models/draft.model");
var feeds =require("../Controllers/feeds.controller")



cloudinary.config({
  cloud_name: "hashstackio",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//*           LOAD ALL ARTICLES AND DRAFTS

var loadAllList = (req, res, next) => {
  var post = new posts();
  var draft = new drafts();
  

  post.loadAllPost(req.user.username, function (err, articles) {
    if (err) {
      res.status(http_status.INTERNAL_SERVER_ERROR.code).send({ data: [] });
    } else {
      //FIND MY DRAFTS TOO
      draft.loadAllDraft(req.user.username, function (err, drafts) {
        if (err) {
          res.status(http_status.INTERNAL_SERVER_ERROR.code).send({ data: [] });
        } else {
          //return both drafts and article
          res.status(http_status.OK.code).send({
            data: {
              articles: articles,
              drafts: drafts,
            },
          });
        }
      });
    }
  });
};

//          LOAD FEATURED IMAGE

var loadImage = (req, res, next) => {
  var story_id = req.query.id;
  posts
    .findById(story_id)
    .select("featured_image")
    .then((doc) => {
      if (doc == null) {
        // console.log("empty image place", doc)
      } else {
        res.send({ data: doc.featured_image, type: "success" });
        // console.log(doc)
      }
    });
};



//*           LOAD SINGLE ARTICLE

var article = (req, res) => {
  var { id } = req.body;
  var post = new posts();

  post.find_article(id, function (err, doc) {
    if (err) {
      res.status(http_status.INTERNAL_SERVER_ERROR.code).send({ data: [] });
    } else res.status(200).send({ data: doc });
  });
};


let updateFeeds = (data, author_id) =>{

    feeds.updateFeeds(data,author_id)

}



//*   CREATE ARTICLE: Finnaly creates article from draft image

var create = (req, res) => {
  if (req.body._id != undefined) {
    //Save to draft and merge to articles
    updateDraftAndSave(req, res);
    //Update Feeds 

} else {
    //create draft and story
    createWithDraft(req, res);

    //Update Feeds
  }
};

var updateDraftAndSave = (req, res) => {
  var draft = new drafts();
  let body = Object.assign({}, req.body, {
    author: req.user.username,
    authorId: req.user._id,
    published: true,
  });
  draft.update_draft(req.body._id, body, true, function (err, ops) {
    //published TRUE

    if (err) {
      // console.log("Unable to remove draft"+err)
    } else {
      // console.log("i passed here just not quite long", ops)
      //save as an Article Now.
      save(req, res);
      updateFeeds(req.body, req.user._id)
    }
  });
};



//Used to replace Actions between data with/without clodibary images
var insertAction = (data,request, response) => {
  var post = new posts();

  post.insertPost(data, (err, success) => {
    if (err) {
      response
        .status(http_status.INTERNAL_SERVER_ERROR.code)
        .send({ data: [], status: http_status.INTERNAL_SERVER_ERROR.code });
    } else {
      response.send({ data: success, status: http_status.OK.code });
      updateFeeds(data, request.user._id)
    }
  });
};





var save = (req, res) => {
  let {
    _id,
    title,
    body_html,
    body_schema,
    category,
    description,
    comments_enabled,
    time_to_read,
    public,
    featured_image,
    tags,
  } = req.body;

  var postDoc = {
    _id,
    title,
    body_schema,
    body_html,
    author: req.user.username,
    category,
    description,
    time_to_read,
    comments_enabled,
    public,
    authorId: req.user._id,
    featured_image:
      featured_image != undefined
        ? featured_image
        : "https://www.inwritten.com/images/preview_featured2.jpg",
    tags,
    post_link: `/user/@${req.user.username}/${title.replace(
      new RegExp(/\s/gi),
      "-"
    )}---${Date.now()}`,
  };

  cloudinary.v2.uploader
    .upload(featured_image, {
      secure: true,
      quality: "auto",
      fetch_format: "auto",
      resource_type: "image",
      public_id: `featured_image/${req.user._id}-${Date.now()}`,
      overwrite: true,
    })
    .then((result) => {
      // console.log(result, "THIS IS RESULT OO")
      let final = Object.assign({}, postDoc, { featured_image: result.url });
      insertAction(final, req,res);
    })
    .catch((error) => insertAction(postDoc, req,res));
};





var createWithDraft = (req, res) => {
  let {
    title,
    body_html,
    body_schema,
    category,
    description,
    comments_enabled,
    time_to_read,
    public,
    featured_image,
    tags,
  } = req.body;

  var postDoc = {
    title,
    body_schema,
    body_html,
    author: req.user.username,
    category,
    description,
    time_to_read,
    comments_enabled,
    public,
    authorId: req.user._id,
    featured_image:
      featured_image != undefined ? featured_image : "link_to_image",
    tags,
    post_link: `/user/@${req.user.username}/${title.replace(
      new RegExp(/\s/gi),
      "-"
    )}---${Date.now()}`,
  };

  cloudinary.v2.uploader
    .upload(featured_image, {
      resource_type: "image",
      public_id: `featured_image/${req.user._id}-${Date.now()}`,
      overwrite: true,
    })
    .then((result) => {
      let final = Object.assign({}, postDoc, { featured_image: result.url });
      insertAction(final,req, res);

    })
    .catch((error) => insertAction(postDoc, req,res));
};

//DELETE ARTICLE WITH SPECIAL _ID
//delete with associated draft






var deletePost = (req, res) => {
  let { id } = req.body;
  let draft = new drafts();
  var post = new posts();

  post.delete_article(id, (err, success) => {
    if (err)
      res
        .status(http_status.INTERNAL_SERVER_ERROR.code)
        .send({ status: 500, data: [] });
    else {
      //delete associated draft
      draft.delete_draft(id, function (err, success) {
        if (err)
          res
            .status(http_status.INTERNAL_SERVER_ERROR.code)
            .send({ status: 500, data: [] });
        else {
          res.status(http_status.OK.code).send({ status: 200, data: success });
        }
      });
    }
  });
};






//*  UPDATE ARTICLE

var update = (req, res) => {
  var post = new posts();
  //update the draft and update the post
  let draft = new drafts();
  let body = Object.assign({}, req.body, {
    author: req.user.username,
    authorId: req.user._id,
    published: true,
  });

  draft.update_draft(req.body._id, body, true, (err1, result) => {
    if (err1) {
      //do nothing
    } else {
      post.update_article(req.body._id, req.body, (err2, success) => {
        if (err2) {
          res
            .status(http_status.INTERNAL_SERVER_ERROR.code)
            .send({ status: 500, data: [] });
          console.log(err + "errr");
        } else
          res.status(http_status.OK.code).send({ status: 200, data: result });
      });
    }
  });
};





var like = (req, res) => {
  posts.updateOne(
    { _id: req.body.id },
    { $inc: { likes: req.body.like } },
    (err, resolve) => {
      if (err) res.send({ message: `An error Occured ${err}` });
      else res.send({ data: resolve, status: 200 });
    }
  );
};

var interests = (req, res) => {
  console.log(req.query.topic)
  let { topic } = req.query
  posts
    .find({ 'category':topic }, "-body_html -body_schema -comments")
    .populate("authorId", "email username featured_image")
    .then(
      (resolve, err) => {
        if(resolve){ console.log(resolve); res.send({ data: resolve, status: 200 })}

        else  {
           res.send({ message: `An error Occured ${err}`, status: 500 })
        }
      });
};



//DELETE AL THE ARTICLES
var delete_all = (req, res, next) => {
  var post = posts
    .deleteMany({ authorId: req.user._id, public: req.body.public })
    .then((data) => {
      res.send({ message: "successfully deleted all", data, status: 200 });
    })
    .catch((error) => {
      res.send({ message: "successfully deleted all", status: 500, error });
    });
};

module.exports = {
  loadAllList: loadAllList,
  create: create,
  update: update,
  deletePost: deletePost,
  article: article,
  like: like,
  interests: interests,
  loadImage: loadImage,
  delete_all: delete_all,
  save: save,
};
