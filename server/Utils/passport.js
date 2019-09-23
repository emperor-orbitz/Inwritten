

var passport = require('passport');
var LocalStrategy = require('passport-local');
var UserModel = require('../Models/user.model');
var passportJWT = require("passport-jwt");
var JWTStrategy = passportJWT.Strategy;
var ExtractJWT = passportJWT.ExtractJwt;
var emailUtil =require("../Utils/email");

/*
 LOGIN, SIGNUP AND JSONWEBTOKEN RULES EXIST HERE
*/



//LOGIN
passport.use('login', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
    session: false
  },
  (req, email, password, done) => {

    var login = new UserModel();

    login.signIn(email, function (err, user) {
      if (user) {

        if (user != null) {

          var compare = login.syncPass(password, user.password);
          if (compare) {
            return done(null, user);

          }
          else
            return done(null, false);


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





//SIGNUP
passport.use('signup', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
    session: false
  },
  async (req, email, password, done) => {

    try {
      var signup = new UserModel();

      signup.findByEmail(email, async (err, success) => {

        if (err)
          return done(err);

        else if (success != null) {
          return done(null, false);
          //res.json({ message: 'Account already exists' });

        }
        else {

          let createUser = await signup.createUser(username, email, password);

          if (createUser != null) {

            
            var email = new emailUtil
            ({email:createUser.email,id:createUser._id})

            await email.VERIFICATION_EMAIL();
            res.json({ message: "Account successfully created" });

            return done(null, createUser)


          }
          else {
            res.json({ message: "Account Not fgfgfg successfully created" });

          }

        }
      })
    }
    catch (Error) {
      res.json({ message: 'Failed' });

      console.log("Failed", fail)

    }


  })
)



//JWT STRATEGY
const JWT_options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  passReqToCallback: true
}


passport.use('jwt', new JWTStrategy(JWT_options,
  async (req, jwt_payload, done) => {

    req.login(jwt_payload.user, { session: false }, async (err) => {
      try {

        let user = await UserModel.findOne({ _id: jwt_payload.user._id });
        if (user != null)
          return done(null, user);

        else
          return done(null, false, { message: "Unauthorized access" });


      }
      catch (err) {

        done(new Error('Something terrible went wrong' + err));

      }
    }
    )





  }))



