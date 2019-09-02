


var express = require('express');
var router = express.Router();
var signup = require('../model/user');
var posts = require('../model/posts');
var passport = require('passport');
var passportConf = require('../passport');
var sgMail = require('@sendgrid/mail');










/*
*
*           SEND VERIFICATION EMAIL
*
*/


router.get('/api/re-mailconfirm/:userid', function (req, res, next) {
    let userid = req.params.userid;
    var finduser = new signup;

    finduser.findUserById(userid)
        .then((res) => {
            if (res === null) console.log('LINK IS BROKEN', res);
            else if (res !== null) {
                if (res.verified === true) {
                    console.log('LINK IS BROKEN -1')
                }
                else if (res.verified != true) {

                    sgMail.setApiKey('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');
                    const msg = {
                        to: res.email,
                        from: 'contact@penbox.com',
                        templateId: 'd-c0dbe040a46b4cc0b2131cb82c58d1ce',
                        dynamic_template_data: {
                            name: res.username,
                            confirm_link: `api/mailconfirm/${res._id}`
                        }
                    };
                    finduser.updatelastVerified(res._id, function (not_updated, updated) {
                        if (not_updated) {
                            console.log('UNABLE TO PROCESS THIS VERIFICATION SENDING')
                        }
                        else {
                            console.log('SEND THE MESSAGE');
                            sgMail.send(msg).then((succ) => {
                                console.log('SENT', succ)
                                res.json({ message: 'Account successfully created' });

                            },
                                (err) => {
                                    console.log('FAILEDDD', err)

                                });

                                    
                        }


                    })



                }

            }






        })
        .catch((err) => {
            console.log('BIG ERROR', err)
        });

})






/**
 * CLICK VERIFICATION LINK
 * 
 */


router.get('/api/mailconfirm/:userid', function (req, res, next) {
    //check if user with ID
    let userid = req.params.userid;
    var finduser = new signup;
    finduser.findUserById(userid)
        .then((result) => {
            if (result === null) {
                //USER NOT FOUND / LINK BROKEN
                //console.log('Link is broken 1')
                res.render('broken_email');

            }
            else if (result != null) {
                //IS IT VERIFIED?
                var date = new Date();
                if ((date.getTime() - result.lastVerified) > (1 * 24 * 60 * 60 * 1000)) {
                    res.render('broken_email')

                }
                else {
                    if (result.verified === true) {

                        res.render('broken_email')
                    }
                    else {
                        finduser.verifyUser(userid, function (err, success) {
                            if (err) {
                                res.render('broken_email')
                            }
                            else {
                                res.render('confirm_email')
                                //console.log('VERIFY USER SUVCESSFULL')
                            }

                        })

                    }
                }


            }



        },

            (err) => {
                console.log('not ', err)
                res.render('broken_email');


            });
    //USER NOT FOUND / LINK BROKEN
    //console.log('broken link')
    //res.render('broken_email');

})






/*
*
*           SIGNUP ACTION
*
*/


router.post('/signup', (req, res, next) => {
    const { username } = req.body;
    const { email } = req.body;
    const { password } = req.body;
    //for testing purpose
    //console.log(req.body);
    var saves = new signup();
    saves.findByEmail(email, (err, success) => {

        if (err) {

            console.log('errror');
        }

        else {

            if (success.length >= 1) {
                console.log(success);
                res.json({ message: 'Account already exists' });

            }
            else {
             
saves.createUser(username, email, password).then((result, fail)=>{
if(result) {
    sgMail.setApiKey('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');
    const msg = {
        to: result.email,
        from: 'contact@penbox.com',

        templateId: 'd-c0dbe040a46b4cc0b2131cb82c58d1ce',
        dynamic_template_data: {
            name: result.username,
            confirm_link: `api/mailconfirm/${result._id}`
        }
    };
    sgMail.send(msg).then(function (succ){
        //console.log('SENT', succ)
        res.json({message:"Account successfully created"});
    },
        function(err) {
            res.json({ message: 'Failed' });

            console.log('FAILEDDD', err)
        });
    
    
}
else{
    console.log("Failed", fail)

}
});

      // .then((result)=>{ console.log("YES", result) })
       //.catch((err)=>{
         //  console.log("NO", err)
          // throw new Error(err)
       //})
 
       /*.then(function(user){
           const username =user;
           console.log(username);
       })
       .catch(function(err){  
        console.log(err)

       } )*/
     /* .then((result)=>{
        sgMail.setApiKey('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');
        const msg = {
            to: result.email,
            from: 'contact@penbox.com',
    
            templateId: 'd-c0dbe040a46b4cc0b2131cb82c58d1ce',
            dynamic_template_data: {
                name: result.username,
                confirm_link: `api/mailconfirm/${result._id}`
            }
        };
        sgMail.send(msg).then(function (succ){
            console.log('SENT', succ)
    
        },
            function(err) {
                res.json({ message: 'Failed' });
    
                console.log('FAILEDDD', err)
            });
    
       })
     .catch(err=> console.log(err));
*/
          
/*if(cr8user == true){
console.log('successfull')
    sgMail.setApiKey('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');
    const msg = {
        to: count.email,
        from: 'contact@penbox.com',

        templateId: 'd-c0dbe040a46b4cc0b2131cb82c58d1ce',
        dynamic_template_data: {
            name: count.username,
            confirm_link: `api/mailconfirm/${count._id}`
        }
    };
    sgMail.send(msg).then(function (succ){
        console.log('SENT', succ)

    },
        function(err) {
            res.json({ message: 'Failed' });

            console.log('FAILEDDD', err)
        });


}
else{
console.log("error to tlemujcbnhjbx", cr8user )
}
*/


                     

                    
                 
            }

        }
    })

})

/*
*
*           LOCAL LOGIN ACTION
*
*/



router.post('/login', (req, res, next) => {


    passport.authenticate('local-strategy', function (err, user) {

        if (err) {
            return res.send({ message: `Sorry Something went wrong! we would fix it`, ID: null })

        }

        if (!user) {
            return res.send({ message: `Invalid username or password`, ID: null });

        }

        else {

            return res.send({ ID: req.users });


        }

    })(req, res, next);



})



/*
*
*          API TESTING
*
*/




router.get('/apis', function (req, res, next) {
    res.send('What API are you looking for?');

})


/*
*
*          CHECK ISLOGGEDIN
*
*/


router.post('/isloggedin', function (req, res, next) {

    if (req.isAuthenticated()) {
        //console.log("request users", req.users)
        var ID = {
            username: req.users.username,
            email: req.users.email,
            //profile_photo: req.users.profile_photo,
            firstName: req.users.firstName,
            lastName: req.users.lastName,
            telephone: req.users.telephone,
            display_picture: req.users.display_picture,
            bio: req.users.bio

        };
        res.send({ isAuth: true, ID: ID });
    }
    else {

        res.send({ isAuth: false, ID: null, message: 'Not loggedin' });
    }
});



/*
*
*           LOGOUT ACTION
*
*/





router.post('/logout', (req, res, next) => {
    req.logOut();
    req.session.destroy((err) => {
        req.session = null;
        res.user = null;
        res.send({ status: 'LOGOUT' });

    })






})




module.exports = router;