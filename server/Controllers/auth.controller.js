


var signup = require('../Models/user.model');
var passport = require('passport');
var sgMail = require('@sendgrid/mail');
var http_status = require("../Utils/http_status");










/*
*
*           SEND VERIFICATION EMAIL
*              send_mail
*/


var send_mail = async (req, res, next) => {

    let userid = req.params.userid;
    var finduser = new signup;
    try {


        var user = await finduser.findUserById(userid);

        if (user === null) console.log('LINK IS BROKEN', res);
        else if (user !== null) {
            if (user.verified === true) console.log('LINK IS BROKEN -1');

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
                finduser.updatelastVerified(res._id, async (not_updated, updated) => {
                    if (not_updated) {
                        res.send({
                            code: http_status.INTERNAL_SERVER_ERROR.code,
                            message: http_status.INTERNAL_SERVER_ERROR.message
                        })
                        console.log('UNABLE TO PROCESS THIS VERIFICATION SENDING')
                    }
                    else {
                        console.log('SEND THE MESSAGE');
                        var send = await sgMail.send(msg);
                        res.send({
                            code: http_status.OK.code,
                            message: http_status.OK.message
                        })
                    }



                })


            }
        }


    }
    catch (error) {
        res.send({
            code: http_status.INTERNAL_SERVER_ERROR.code,
            message: http_status.INTERNAL_SERVER_ERROR.message
        })
    }









}









/*
*
*           SEND VERIFICATION EMAIL
*              verify_mail
*/




var verify_mail = async (req, res, next) => {
    //check if user with ID

    let userid = req.params.userid;
    var finduser = new signup;
    try {
        var result = await finduser.findUserById(userid);

        if (result === null) {
            res.render('broken_email');

        }
        else if (result != null) {
            //IS IT VERIFIED?
            var date = new Date();
            if ((date.getTime() - result.lastVerified) > (1 * 24 * 60 * 60 * 1000)) {
                res.render('broken_email')

            }
            else if (result.verified === true) {

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
    catch (error) {

        res.render('broken_email');

    }



}





//USER NOT FOUND / LINK BROKEN
//console.log('broken link')
//res.render('broken_email');








/*
*
*           SIGNUP ACTION
*           Signup user /PASSPORT
*/


var signup = (req, res, next) => {

    const { username, email, password } = req.body;

    var saves = new signup();
    saves.findByEmail(email, (err, success) => {

        if (err) 
            console.log('errror');
        
        else if (success.length >= 1) {
                console.log(success);
                res.json({ message: 'Account already exists' });

            }
            else {

                saves.createUser(username, email, password).then((result, fail) => {
                    if (result) {
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
                        sgMail.send(msg).then(function (succ) {
                            //console.log('SENT', succ)
                            res.json({ message: "Account successfully created" });
                        },
                            function (err) {
                                res.json({ message: 'Failed' });

                                console.log('FAILEDDD', err)
                            });


                    }
                    else {
                        console.log("Failed", fail)

                    }
                });

      





            }

        
    })

}



/*
*
*           LOCAL LOGIN ACTION
*
*/



var login = (req, res, next) => {


    passport.authenticate('login', function (err, user) {

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



}



/*
*
*          API TESTING
*
*/




var api = (req, res, next) => {
    res.send('What API are you looking for?');

}


/*
*
*          CHECK ISLOGGEDIN
*
*/









module.exports = {
   login: login,
   signup:signup,
   verify_mail:verify_mail,
   send_mail:send_mail,
   api:api

};