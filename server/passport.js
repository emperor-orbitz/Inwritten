

var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('./model/user');
var bcrypt = require('bcrypt');


//SERIALIZE USER
passport.serializeUser(function (user, done) {

  done(null, user[0]._id);

})
//DESERIALIZE THE USER 
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  })
})





passport.use('local-strategy', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function (req, email, password, done) {
    var login = new User();

    var userCredentials = {
      email: email,
      password: password
    }

    login.signIn(userCredentials.email, function (err, user) {
      if (user) {
        //console.log(user);
        if (user.length >= 1) {

          var compare = login.syncPass(userCredentials.password, user[0].password);
          if (compare) {

            req.login(user, function (err) {
              if (err) { return done(err); }
              return done(null, user);
            })


          }
          if (!compare) {

            return done(null, false);

          }
        }
        else {
          console.log('MISTAKE ERROR AT MONGOOSE SCHEMA DOC');
          return done(null, false);
        }
      }
      else {
        return done(err);
      }

    })

  })
)
   /* 
    User.findOne({email:email, password:password}, function(err, user){                                                                                                
      if(err){ return done(err)}
         if(!user){ return done(null, false);}
         else { return done(null, user);}
   */





