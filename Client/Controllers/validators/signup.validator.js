var joi =require("joi");

   export default class validateSignup{
        
        
    constructor(){

        this.schema = joi.object().keys({
             emailValue: joi.string().email().required().error( __ => this.errorFormat(__) ),
             usernameValue: joi.string().alphanum().min(6).required().error(  __ => this.errorFormat(__) ),
             passwordValue: joi.string().min(6).error(  __ => this.errorFormat(__) )
         
            })
      }

       errorFormat(errors){

         errors.forEach(err =>{
          switch(err.type){
            case 'any.empty':
             err.message =  `${err.context.key} should not be empty`;
             break;
     
            case "string.min":
             err.message = `${err.context.key} cannot be less than 6`;
            break;
     
            default:
            break;
       }
     
         })
       return errors;
      }
     
      
     
         validate(usernameValue, emailValue, passwordValue){
     
         return joi.validate({ usernameValue, emailValue, passwordValue }, this.schema)
     
        }
     





   }
   



 
 


   