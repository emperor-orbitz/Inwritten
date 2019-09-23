
var signup = require('../Models/user.model');
var passport = require('passport');
var sgMail = require('@sendgrid/mail');
var http_status = require("../Utils/http_status");
var jwt = require("jsonwebtoken");





/*
*
*           SEND VERIFICATION EMAIL
*              send_mail
#           NOT YET TESTED 
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
                        res.status(http_status.INTERNAL_SERVER_ERROR.code)
                           .send({ data: [] });

                    }
                    else {
                        console.log('SEND THE MESSAGE');
                        var send = await sgMail.send(msg);

                        res.status(http_status.OK.code)
                           .send({ data: [] });
                    }



                })


            }
        }


    }
    catch (error) {
        res.status(http_status.INTERNAL_SERVER_ERROR.code)
           .send({ data: [] });
    }



}




/*

           SEND VERIFICATION EMAIL
              verify_mail
            #NOT YET TESTED
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
                    }

                })

            }
        }

    }
    catch (error) {

        res.render('broken_email');

    }



}










/*
*
*           SIGNUP ACTION
*           Signup user /PASSPORT
*/


var register = (req, res, next) => {
    const { username, email, password } = req.body;

    var saves = new signup();
    saves.findByEmail(email, async(err, success) => {
        if (err) 
           res.json({ message: 'Error already occured' });
        
        else if (success != null ) {
                console.log(success);
                res.json({ message: 'Account already exists' });

            }
            else {

                try{
                    var result = await saves.createUser(username, email, password);

                    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                            const msg = {
                                to: result.email,
                                from: 'contact@penbox.com',
    
                                templateId: 'd-c0dbe040a46b4cc0b2131cb82c58d1ce',
                                dynamic_template_data: {
                                    name: result.username,
                                    confirm_link: `api/mailconfirm/${result._id}`
                                }
                            }
                        await sgMail.send(msg);
                        res.json({ message: "Account successfully created"+ succ });

   
                            } 

                catch(error){
                    res.json({ message: 'Failed! An error is here'+error });
                    //console.log("error"+error);
                }
               

      





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
           res.send({ message: `Sorry Something went wrong! we would fix it`, ID: null })

        }

        if (!user) {
         res.send({ message: `Invalid username or password`, ID: null });

        }

        else {
            
            var signature = jwt.sign({user:user}, process.env.JWT_SECRET,
                {
                    expiresIn:"7d"
                });

            res.send({ token: `bearer ${signature}`, user: user});


        }

    })(req, res, next);



}




/*
         CHECK ISLOGGEDIN
*/
var isloggedin = (req, res, next) => {
    
res.send({message:"OK",
         status: 200,
          info:"User is loggedin"
        });
}






/*
*          API TESTING
*/




var api = (req, res, next) => {
    res.send('What API are you looking for?');

}


module.exports = {
   login: login,
   register:register,
   verify_mail:verify_mail,
   send_mail:send_mail,
   api:api,
   isloggedin:isloggedin

};