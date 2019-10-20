// VALIDATION WITH JOI PACKAGE 

var Joi = require("joi");

module.exports = class validation{


validate(data){
    
var data = {
    email: data.email,
    username: data.username,
    firstName: data.firstName,
    lastName: data.lastName,
    telephone: data.telephone,
    lastVerified: data.lastVerified,
    verified: data.verified
};
    const schema = Joi.object().keys({

        email: Joi.string().email().required(),
        username: Joi.string().lowercase().required(),
        firstName: Joi.string().optional().allow("").min(2),
        lastName: Joi.string().optional().allow("").min(2),
        telephone: Joi.string().optional().allow("").min(11).max(11),
        lastVerified: Joi.date(),
        verified: Joi.boolean()
    
    });

    return Joi.validate(data, schema);

}















}



// validate the request data against the schema
