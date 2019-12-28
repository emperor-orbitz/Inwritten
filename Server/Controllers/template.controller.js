var templ = require('../Models/template.model');
//var http_status = require("../Utils/http_status");
var User = require("../Models/user.model")




// INSERT NEW TEMPLATE
var insert = (req, res, next) => {

    var temp = new templ()
    templ.create({ ...req.body })
        .then(data => {
            res.send(data)
        })
        .catch(err => res.send(err))


}



//      LOAD ONE TEMPLATES PREVIEW
var template_sample = (req, res, next) => {

    templ.findOne({ _id: req.params.template_id })
        .then(data => {
            if (data == null){
                res.send({ message:'An error has occured', status:500 })
            } 
            else 
                res.render(`${data.template_name}/sample`)
            
        })
        .catch(err => { 
            res.send("An error has occured ehehr") })


}




// LOAD ALL TEMPLATES
var templates = (req, res, next) => {
    templ.find({ _id: {$ne: req.params.current_template }})
        .then(data => {
            res.send({ data:data, status:200 });

        }).catch(err => {
            res.send({ message:"An error occured" + err, status:500 });
        })


}





//LOAD TEMPLATES BASED ON CATEGORY
var templates_by_category = (req, res, next) => {
    let category = req.query.category;
    templ.find({ category: category }, (err) => {
        res.send(err)
    },
        (doc) => {
            res.send(doc);
        })


}





//Add template to user profile data
var add_template_to_profile = async (req, res, next) => {
    let { template_id } = req.params;
    let { _id, username } = req.user;

    try {
        var profile = await User.updateOne({ username, _id}, 
        { $set: { template_id } })

        if (profile.nModified == 1) {
            res.send({ message:"Successfully updated your template data on profile", status:200 })
        }
        else  res.send({ message:"Sorry, we were unable to add your template", status:500 })
 
    } catch (error) {

        res.send("There was an error" + error)
    }


}





 var my_template = (req, res, next) =>{

    templ.findById(req.params.template_id)
         .then( result => {
             if(result == null) res.send({ message:null, status:200  })
             else res.send({ message:result, status:200  }) 
         })
         .catch(err => res.send({ message:'Sorrry something went wrong', status:500 }) )


 }



module.exports = {
    insert: insert,
    my_template: my_template,
    template_sample: template_sample,
    templates: templates,
    add_template_to_profile: add_template_to_profile,
    templates_by_category: templates_by_category
};