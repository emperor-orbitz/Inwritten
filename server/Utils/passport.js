

var passport = require('passport');
var LocalStrategy = require('passport-local');
var UserModel = require('../Models/user.model');
var bcrypt = require('bcrypt');
var passportJWT = require("passport-jwt");
var sgMail = require('@sendgrid/mail');
var JWTStrategy = passportJWT.Strategy;
var ExtractJWT = passportJWT.ExtractJwt;
require("dotenv").config();
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

        if (user.length >= 1) {

          var compare = login.syncPass(password, user.password);
          if (compare) {

            req.login(user, function (err) {
              if (err) return done(err);
              return done(null, user);
            })


          }
          if (!compare) return done(null, false);


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

        else if (success!= null) {
        return done(null, false ); 
          //res.json({ message: 'Account already exists' });

        }
        else {

          let createUser = await signup.createUser(username, email, password);

          if (createUser != null) {

            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
              to: result.email,
              from: 'contact@penbox.com',

              templateId: 'd-c0dbe040a46b4cc0b2131cb82c58d1ce',
              dynamic_template_data: {
                name: result.username,
                confirm_link: `api/mailconfirm/${result._id}`
              }
            };

            let sendMail = await sgMail.send(msg);
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
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: 'malikisgood'//process.env.JWT_SECRET
}
passport.use('jwt', new JWTStrategy(JWT_options, async (jwt_payload, done) => {

  try {

    let user = await UserModel.findOne({ _id: jwt_payload.id });
    if (user != null) {
      done(null, user);
    }
    else done(null, false);


  }
  catch (err) {

    done(new Error('Something terrible went wrong'));

  }




}))




