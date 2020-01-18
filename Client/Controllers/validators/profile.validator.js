var joi =require("joi");

   export default class validateProfile{

    constructor(){

        this.schema = joi.object().keys({
             username: joi.string().alphanum().min(5).required().trim().error(  __ => this.errorFormat(__) ),
             last_name: joi.string().min(2).trim().error( __ => this.errorFormat(__) ),
             mobile_number: joi.string().trim().regex(/^[0-9]{7,11}$/).error(  __ => this.errorFormat(__) ),
             bio: joi.string().min(6).allow("").error(  __ => this.errorFormat(__) )
         
            })
      }

       errorFormat(errors){

         errors.forEach(err =>{
            console.log(err)

          switch(err.type){
            case 'any.empty':
             err.message =  `${err.context.key.toUpperCase()} cannot be an empty field `;
             break;
     
            case "string.min":

             err.message = `${err.context.key.toUpperCase()} should have a minimum length of ${err.context.limit}`;
            break;

            case "string.max":

             err.message = `${err.context.key.toUpperCase()} should have a maximum length of ${err.context.limit}`;
            break;

            case "string.regex.base":

            err.message = `${err.context.key.toUpperCase()} should have an acceptable format `;
           break;
     
            default:
            break;
       }
     
         })
       return errors;
      }
     
      
     
         validate(username, last_name, mobile_number, bio){
     
         return joi.validate({ username, last_name, mobile_number, bio }, this.schema)
     
        }
     





















   }
   



 
 


   