
var mongoose =require('mongoose');
var bcrypt =require('bcryptjs');

const SALT_FACTOR =10;
var SCHEME =require('./scheme');
//var Schema = mongoose.Schema;

var userSchema = SCHEME.profile;
 
// PRE SAVE HOOK


userSchema.pre('save', function(next){
var user =this;

if(!user.isModified('password')){
    return next("path has been modified");
}

bcrypt.genSalt(SALT_FACTOR, function(err, salt){

if(err){

    return next(err);
} 


bcrypt.hash(user.password, salt,  function(err, hash){
if(err){
    return next(err);
} 
user.password = hash;
return next();
})
})
}, function(err){
    return next(err)
}


);







/*
*
*           CREATE NEW USER
*
*/



userSchema.methods.createUser = function(username, email, password){

    var sav =  mongoose.model('User', userSchema);
   var docs = {
        username:username,
        email:email, 
        password:password,
        lastName: '',
        firstName: '',
        telephone: '',
        bio:  ''
    };

    return sav.create({...docs}) //console.log(xxx)    
    
    


}


/*
*
*           FIND USER WITH EMAIL
*
*/



userSchema.methods.findByEmail = function(email, cb){
return mongoose.model('User', userSchema)
.findOne({email:email}, cb);
}

userSchema.methods.signIn = function(email, cb){
return mongoose.model('User', userSchema)
.findOne({ email:email }, cb);
};

/*
*
*           COMPARE HASH PASSWORD
*
*/



userSchema.methods.syncPass = function(pass, ret_pass){
    console.log(pass+", "+ret_pass);
    return bcrypt.compareSync(pass, ret_pass);
}

/*
*
*           UPDATE PROFILE /--> EXCLUDING PASSWORDS
*
*/

userSchema.methods.findUserById = function(id){

return mongoose.model('User', userSchema).findById(id);


}


userSchema.methods.updateProfile = function(id, update, cb){
return mongoose.model('User',userSchema).updateMany({_id: id},
{ $set:{ 
    firstName: update.firstName,
    lastName:update.lastName, 
    telephone:update.telephone,
    //email:update.email,
    bio: update.bio,
    display_picture: update.profile_photo,
    username:update.username

}}, cb)

}




userSchema.methods.verifyUser = function(id, cb){
    return mongoose.model('User',userSchema).update({_id: id},
    { $set:{ 
      verified:true
    }}, cb
    )
    
    }


    userSchema.methods.updatelastVerified = function(id, cb){
        return mongoose.model('User',userSchema).update({_id: id},
        { $set:{ 
          lastVerified:Date.now()
        }}, cb
        )
        
        }

/*
*
*           UPDATE PROFILE /--> INCLUDING PASSWORDS
*
*/


userSchema.methods.updateProfile_password = function(id, update, cb){
    return mongoose.model('User',userSchema).update({_id: id},
    { $set:{ 
        password: update.password
    
    }}, cb
    )

    
    }

    
module.exports= mongoose.model('User', userSchema);




