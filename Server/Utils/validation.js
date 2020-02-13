// VALIDATION WITH JOI PACKAGE 

var Joi = require("joi");

module.exports = class validation{


validate(data){
    
var data = {
    email: data.email,
    username: data.username,
    password: data.password
};
    const schema = Joi.object().keys({

        email: Joi.string().email().required(),
        username: Joi.string().lowercase().required(),
        password: Joi.string().required()
    
    });

    return Joi.validate(data, schema);

}















}



// validate the request data against the schema
